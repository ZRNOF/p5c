function setup() {
	createCanvas(400, 400)
	// make p5 canvas responsive
	flex({ container: { padding: "20px" } })

	noStroke()
}

function draw() {
	background("#00647f")
	circle(mouseX, mouseY, 50)
}
