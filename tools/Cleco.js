import ANSI from "./ANSI.js"

export const color = (text, hexColor) => {
	const r = parseInt(hexColor.slice(1, 3), 16)
	const g = parseInt(hexColor.slice(3, 5), 16)
	const b = parseInt(hexColor.slice(5, 7), 16)
	const colorCode = `\x1b[38;2;${r};${g};${b}m`
	return `${colorCode}${text}${ANSI.reset}`
}

export const typing = (text, hexColors, interval, isBold) => {
	const colorArray = Array.isArray(hexColors) ? hexColors : [hexColors]
	return new Promise((resolve) => {
		for (let index = 0; index < text.length; index++) {
			setTimeout(() => {
				const charColor = colorArray[index % colorArray.length]
				const char = color(text.substring(index, index + 1), charColor, isBold)
				process.stdout.write(char)
				if (index === text.length - 1) resolve()
			}, interval * index)
		}
	})
}
