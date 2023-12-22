import { exec } from "child_process"
import * as fs from "node:fs"

fs.existsSync("./TEST") || fs.mkdirSync("./TEST")
process.chdir("./TEST")

const commands = [
	`node ../p5c.js GBPF -g -b -p -f`,
	`node ../p5c.js GBPN -g -b -p -n`,
	`node ../p5c.js GBWF -g -b -w -f`,
	`node ../p5c.js GBWN -g -b -w -n`,

	`node ../p5c.js GSPF -g -s -p -f`,
	`node ../p5c.js GSPN -g -s -p -n`,
	`node ../p5c.js GSWF -g -s -w -f`,
	`node ../p5c.js GSWN -g -s -w -n`,

	`node ../p5c.js IBPF -i -b -p -f`,
	`node ../p5c.js IBPN -i -b -p -n`,
	`node ../p5c.js IBWF -i -b -w -f`,
	`node ../p5c.js IBWN -i -b -w -n`,

	`node ../p5c.js ISPF -i -s -p -f`,
	`node ../p5c.js ISPN -i -s -p -n`,
	`node ../p5c.js ISWF -i -s -w -f`,
	`node ../p5c.js ISWN -i -s -w -n`,
]

function runCommands() {
	commands.forEach((command) => {
		const childProcess = exec(command)

		// Log the command's output
		childProcess.stdout.on("data", (data) => {
			console.log(`stdout [${command}]: ${data}`)
		})

		// Log any errors
		childProcess.stderr.on("data", (data) => {
			console.error(`stderr [${command}]: ${data}`)
		})
	})
}

runCommands()
