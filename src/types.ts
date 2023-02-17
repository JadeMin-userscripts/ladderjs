export const enum StartEvents {
	HEAD = 'headStart',
	BODY = 'bodyStart',
};
export const enum EndEvents {
	HEAD = 'headEnd',
	BODY = 'bodyEnd',
};


export type AllEvents = StartEvents | EndEvents;
export type Listeners = {
	[key in AllEvents]: Function[];
};


export type HTMLHeadBodyElement = HTMLHeadElement | HTMLBodyElement;
export type HTMLStyleScriptElement = HTMLStyleElement | HTMLScriptElement;
export type StyleCreaterParams = {
	selector: string,
	styles: {
		[key: string]: string;
	}
};