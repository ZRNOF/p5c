#!/usr/bin/env node

import { program } from "commander"
import inquirer from "inquirer"
import { fileURLToPath } from "url"
import { dirname } from "path"
import * as fs from "node:fs/promises"
import { color, typing } from "./tools/Cleco.js"
import questions from "./Questions.js"
import { BODY_SCRIPT, HEAD_SCRIPT, STYLE_SHEET } from "./htmlTags.js"

const DIRNAME = dirname(fileURLToPath(import.meta.url))
const CWD = process.cwd()

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

const welcome = async () => {
	await typing("\np5*js Template\n\n", "#ed225d", 25, true)
	await sleep(50)
}

const checkOptions = (options, exclusiveOptions) => {
	const selectedOptions = exclusiveOptions.filter((opt) => options[opt])
	if (selectedOptions.length > 1) {
		const msg = `Error: Can only use one of ${selectedOptions
			.map((opt) => `'${opt}'`)
			.join(" | ")} option at the same time.`
		console.error(color(msg, "#ed225d"))
		process.exit(1)
	}
}

const updateProjectHTML = async (opts) => {
	const projectPath = `${CWD}/${opts.projectName}`
	const path = `${projectPath}/index.html`
	const oldContent = await fs.readFile(path, "utf8")
	const newContent = oldContent
		.replace(`<!-- head-script -->`, HEAD_SCRIPT[opts.projectType])
		.replace(`<!-- style-sheet -->`, STYLE_SHEET)
		.replace(`<!-- body-script -->`, BODY_SCRIPT[opts.p5Mode][opts.template])
		.replace(`<!-- projectName -->`, `<title>${opts.projectName}</title>`)
	await fs.writeFile(path, newContent, "utf8")
}

const removeJsconfigEntry = async (entryToRemove, opts) => {
	const projectPath = `${CWD}/${opts.projectName}`
	const path = `${projectPath}/jsconfig.json`
	const config = JSON.parse(await fs.readFile(path, "utf8"))
	config.include = config.include.filter((entry) => entry !== entryToRemove)
	await fs.writeFile(path, JSON.stringify(config, null, "\t") + "\n")
}

const rmDir = async (path) => {
	await fs.rm(path, { recursive: true })
}

const cpDir = async (oldPath, newPath) => {
	await fs.mkdir(newPath)
	await fs.cp(oldPath, newPath, { recursive: true })
}

const cpFile = async (oldPath, newPath) => {
	await fs.copyFile(oldPath, newPath)
}

const generatePaths = (opts) => {
	const projectPath = `${CWD}/${opts.projectName}`
	const templatesPath = `${DIRNAME}/p5-templates`
	const utilsPath = `${DIRNAME}/utils`
	const sketchName = `${opts.p5Mode}_${opts.template}_${opts.canvasMode}`

	const src = {
		sketchPath: `${templatesPath}/sketches/${sketchName}.js`,
		shaderPath: `${templatesPath}/shader/${opts.p5Mode}.js`,
		htmlPath: `${templatesPath}/index.html`,
		stylePath: `${templatesPath}/style.css`,
		libPath: `${utilsPath}/lib`,
		typesPath: `${utilsPath}/types`,
		jsconfigPath: `${utilsPath}/jsconfig.json`,
		fxhashPath: `${utilsPath}/fxhash.js`,
	}

	const dst = {
		sketchPath: `${projectPath}/sketch.js`,
		shaderPath: `${projectPath}/shader.js`,
		htmlPath: `${projectPath}/index.html`,
		stylePath: `${projectPath}/style.css`,
		libPath: `${projectPath}/lib`,
		typesPath: `${projectPath}/types`,
		jsconfigPath: `${projectPath}/jsconfig.json`,
		fxhashPath: `${projectPath}/fxhash.js`,
	}

	return { src, dst }
}

const createTemplate = async (opts) => {
	await fs.mkdir(`${CWD}/${opts.projectName}`)

	const { src, dst } = generatePaths(opts)

	await cpDir(src.libPath, dst.libPath)
	await cpDir(src.typesPath, dst.typesPath)
	await cpFile(src.jsconfigPath, dst.jsconfigPath)
	await cpFile(src.sketchPath, dst.sketchPath)
	await cpFile(src.htmlPath, dst.htmlPath)
	await cpFile(src.stylePath, dst.stylePath)

	const cpShader = opts.template === "Shader"
	const cpFxhash = opts.projectType === "fxhash"
	const rmFxhash = !cpFxhash
	cpShader && (await cpFile(src.shaderPath, dst.shaderPath))
	cpFxhash && (await cpFile(src.fxhashPath, dst.fxhashPath))
	rmFxhash && (await rmDir(`${dst.typesPath}/fxhash`))
	rmFxhash && (await removeJsconfigEntry("types/fxhash/**/*.d.ts", opts))

	await updateProjectHTML(opts)

	console.log(color("\n✔ Have fun!\n", "#22ed5d"))
}

program
	.arguments("[projectName]")
	.option("-g, --global", "p5 Mode: Global (default)")
	.option("-i, --instance", "p5 Mode: Instance")
	.option("-b, --basic", "Template: Basic (default)")
	.option("-s, --shader", "Template: Shader")
	.option("-p, --p2d", "Canvas Mode: P2D (default)")
	.option("-w, --webgl", "Canvas Mode: WEBGL")
	.option("-n, --normal", "Project Type: Normal (default)")
	.option("-f, --fxhash", "Project Type: fxhash")
	.action(async (projectName, options) => {
		checkOptions(options, ["global", "instance"])
		checkOptions(options, ["basic", "shader"])
		checkOptions(options, ["p2d", "webgl"])
		checkOptions(options, ["normal", "fxhash"])

		const optionsIsEmpty = Object.keys(options).length === 0

		if (!projectName && optionsIsEmpty) {
			await welcome()
			inquirer
				.prompt(questions)
				.then(async (answers) => await createTemplate(answers))
		} else {
			projectName = projectName ?? "Sketch"

			try {
				await fs.access(`${CWD}/${projectName}`)
				console.log(color("✖ Directory already exists.", "#ed225d"))
				process.exit(1)
			} catch (error) {}

			await createTemplate({
				projectName,
				p5Mode: options.instance ? "Instance" : "Global",
				template: options.shader ? "Shader" : "Basic",
				canvasMode: options.webgl ? "WEBGL" : "P2D",
				projectType: options.fxhash ? "fxhash" : "Normal",
			})
		}
	})

program.parse(process.argv)
