import * as fs from "node:fs/promises"
import { color } from "./tools/Cleco.js"

const CWD = process.cwd()

const checkDirExists = async (projectName) => {
	try {
		await fs.access(`${CWD}/${projectName}`)
		console.log(color("\n✖ Directory already exists.\n", "#ed225d"))
		return false
	} catch (error) {
		return true
	}
}

const questions = [
	{
		type: "input",
		name: "projectName",
		message: "Project Name:",
		default: "Sketch",
		validate: async (projectName) => await checkDirExists(projectName),
	},
	{
		type: "list",
		name: "p5Mode",
		message: "p5 Mode:",
		choices: ["Global", "Instance"],
		default: "Global",
	},
	{
		type: "list",
		name: "template",
		message: "Template:",
		choices: ["Basic", "Shader"],
		default: "Basic",
	},
	{
		type: "list",
		name: "canvasMode",
		message: "Canvas Mode:",
		choices: ["P2D", "WEBGL"],
		default: "P2D",
	},
	{
		type: "list",
		name: "projectType",
		message: "Project Type:",
		choices: ["Normal", "fxhash"],
		default: "Normal",
	},
]
export default questions
