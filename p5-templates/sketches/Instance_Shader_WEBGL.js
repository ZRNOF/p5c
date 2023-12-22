import { vert, frag } from "./shader.js"

new p5((p) => {
	const [WIDTH, HEIGHT] = [600, 600]
	const PIXEL_DENSITY = 1
	const CANVAS_SIZE = [WIDTH, HEIGHT]
	const TEXEL_SIZE = [1 / (WIDTH * PIXEL_DENSITY), 1 / (HEIGHT * PIXEL_DENSITY)]
	let theShader

	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT, p.WEBGL)
		// make p5 canvas responsive
		p.flex({ container: { padding: "20px" } })

		p.pixelDensity(PIXEL_DENSITY)

		theShader = p.createShader(vert, frag)

		p.noStroke()
		p.imageMode(p.CENTER)
	}

	p.draw = () => {
		p.background(255)

		// use shader on canvas
		p.shader(theShader)
		theShader.setUniform("tex0", p._renderer)
		theShader.setUniform("canvasSize", CANVAS_SIZE)
		theShader.setUniform("texelSize", TEXEL_SIZE)
		theShader.setUniform("mouse", [p.mouseX / WIDTH, p.mouseY / HEIGHT])
		theShader.setUniform("time", p.frameCount)
		p.quad(-1, 1, 1, 1, 1, -1, -1, -1)
	}
})
