new p5((p) => {
	p.setup = () => {
		p.createCanvas(400, 400)
		// make p5 canvas responsive
		p.flex({ container: { padding: "20px" } })

		p.noStroke()
	}

	p.draw = () => {
		p.background("#00647f")
		p.circle(p.mouseX, p.mouseY, 50)
	}
})
