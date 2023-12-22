function setup() {
	createCanvas(400, 400, WEBGL)
	// make p5 canvas responsive
	flex({ container: { padding: "20px" } })

	stroke(51)
	strokeWeight(5)
}

function draw() {
	background("#00647f")
	lights()
	orbitControl(1, 1, 1, { freeRotation: true })
	rotateX(frameCount * 0.01)
	rotateY(frameCount * 0.01)
	box(100)
}
