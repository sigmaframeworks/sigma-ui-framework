interface KramedStatic {
	(md: string): string;
	(md: string, options: any): string;
	setOptions(options: any);
	Renderer: any;
}
declare var kramed: KramedStatic;

declare module 'kramed' {
	export = kramed;
}
