new p5((p) => {
	p.setup = () => {
		p.createCanvas(400, 400, p.WEBGL)
		// make p5 canvas responsive
		p.flex({ container: { padding: "20px" } })

		p.stroke(51)
		p.strokeWeight(5)
	}

	p.draw = () => {
		p.background("#00647f")
		p.lights()
		p.orbitControl(1, 1, 1, { freeRotation: true })
		p.rotateX(p.frameCount * 0.01)
		p.rotateY(p.frameCount * 0.01)
		p.box(100)
	}
})
