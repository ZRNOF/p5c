export type fx = {
	hash: string
	rand: () => number
	minter: string
	randminter: () => number
	context: string
	iteration: number
	preview: () => void
	isPreview: boolean
	features: (features: object) => void
	getFeature: (id: string) => any
	getFeatures: () => object
	params: (paramsDefinitions: any[]) => void
	getParam: (id: string) => any
	getParams: () => object
	getRawParam: (id: string) => string
	on: (event: string, handler: () => void, onDone: () => void) => void
	emit: (event: string, data: any) => void
} & {
	rand: {
		reset: () => void
	}
	randminter: {
		reset: () => void
	}
}
