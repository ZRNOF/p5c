const [WIDTH, HEIGHT] = [600, 600]
const PIXEL_DENSITY = 1
const CANVAS_SIZE = [WIDTH, HEIGHT]
const TEXEL_SIZE = [1 / (WIDTH * PIXEL_DENSITY), 1 / (HEIGHT * PIXEL_DENSITY)]
let gfx, theShader

function setup() {
	createCanvas(WIDTH, HEIGHT)
	// make p5 canvas responsive
	flex({ container: { padding: "20px" } })

	pixelDensity(PIXEL_DENSITY)

	gfx = createGraphics(WIDTH, HEIGHT, WEBGL)
	theShader = createShader(vert, frag)

	noStroke()
	gfx.noStroke()
}

function draw() {
	background(255)
	gfx.background(0)

	// draw square follow mouse
	push()
	translate(mouseX, mouseY)
	rectMode(CENTER)
	rotate(frameCount * 0.05)
	fill("#FF0000")
	square(0, 0, 150)
	pop()

	// use shader on gfx
	gfx.shader(theShader)
	theShader.setUniform("tex0", this._renderer)
	theShader.setUniform("canvasSize", CANVAS_SIZE)
	theShader.setUniform("texelSize", TEXEL_SIZE)
	theShader.setUniform("mouse", [mouseX / WIDTH, mouseY / HEIGHT])
	theShader.setUniform("time", frameCount)
	gfx.quad(-1, 1, 1, 1, 1, -1, -1, -1)

	// paste gfx to canvas
	image(gfx, 0, 0)
}
