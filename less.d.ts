declare module '*.module.less' {
	const classes: Readonly<Record<string, string>>
	export default classes
}

declare module '*.less' {
	const css: string
	export default css
}
