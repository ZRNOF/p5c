const [WIDTH, HEIGHT] = [600, 600]
const PIXEL_DENSITY = 1
const CANVAS_SIZE = [WIDTH, HEIGHT]
const TEXEL_SIZE = [1 / (WIDTH * PIXEL_DENSITY), 1 / (HEIGHT * PIXEL_DENSITY)]
let theShader

function setup() {
	createCanvas(WIDTH, HEIGHT, WEBGL)
	// make p5 canvas responsive
	flex({ container: { padding: "20px" } })

	pixelDensity(PIXEL_DENSITY)

	theShader = createShader(vert, frag)

	noStroke()
	imageMode(CENTER)
}

function draw() {
	background(255)

	// use shader on canvas
	shader(theShader)
	theShader.setUniform("tex0", this._renderer)
	theShader.setUniform("canvasSize", CANVAS_SIZE)
	theShader.setUniform("texelSize", TEXEL_SIZE)
	theShader.setUniform("mouse", [mouseX / WIDTH, mouseY / HEIGHT])
	theShader.setUniform("time", frameCount)
	quad(-1, 1, 1, 1, 1, -1, -1, -1)
}
