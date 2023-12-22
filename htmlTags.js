export const HEAD_SCRIPT = {
	fxhash:
		'<script src="./fxhash.js"></script>\n\t\t' +
		'<script src="./lib/p5.min.js"></script>\n\t\t' +
		'<script src="./lib/p5.flex.min.js"></script>',
	Normal:
		'<script src="./lib/p5.min.js"></script>\n\t\t' +
		'<script src="./lib/p5.flex.min.js"></script>',
}

export const STYLE_SHEET = '<link rel="stylesheet" href="./style.css" />'

export const BODY_SCRIPT = {
	Global: {
		Basic: '<script src="./sketch.js"></script>',
		Shader:
			'<script src="./shader.js"></script>\n\t\t' +
			'<script src="./sketch.js"></script>',
	},
	Instance: {
		Basic: '<script type="module" src="./sketch.js"></script>',
		Shader:
			'<script type="module" src="./shader.js"></script>\n\t\t' +
			'<script type="module" src="./sketch.js"></script>',
	},
}
