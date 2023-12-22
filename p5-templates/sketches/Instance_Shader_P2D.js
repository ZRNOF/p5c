import { vert, frag } from "./shader.js"

new p5((p) => {
	const [WIDTH, HEIGHT] = [600, 600]
	const PIXEL_DENSITY = 1
	const CANVAS_SIZE = [WIDTH, HEIGHT]
	const TEXEL_SIZE = [1 / (WIDTH * PIXEL_DENSITY), 1 / (HEIGHT * PIXEL_DENSITY)]
	let gfx, theShader

	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT)
		// make p5 canvas responsive
		p.flex({ container: { padding: "20px" } })

		p.pixelDensity(PIXEL_DENSITY)

		gfx = p.createGraphics(WIDTH, HEIGHT, p.WEBGL)
		theShader = p.createShader(vert, frag)

		p.noStroke()
		gfx.noStroke()
	}

	p.draw = () => {
		p.background(255)
		gfx.background(0)

		// draw square follow mouse
		p.push()
		p.translate(p.mouseX, p.mouseY)
		p.rectMode(p.CENTER)
		p.rotate(p.frameCount * 0.05)
		p.fill("#FF0000")
		p.square(0, 0, 150)
		p.pop()

		// use shader on gfx
		gfx.shader(theShader)
		theShader.setUniform("tex0", p._renderer)
		theShader.setUniform("canvasSize", CANVAS_SIZE)
		theShader.setUniform("texelSize", TEXEL_SIZE)
		theShader.setUniform("mouse", [p.mouseX / WIDTH, p.mouseY / HEIGHT])
		theShader.setUniform("time", p.frameCount)
		gfx.quad(-1, 1, 1, 1, 1, -1, -1, -1)

		// paste gfx to canvas
		p.image(gfx, 0, 0)
	}
})
