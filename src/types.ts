export enum StartEvents {
	head = 'headStart',
	body = 'bodyStart',
};
export enum EndEvents {
	head = 'headEnd',
	body = 'bodyEnd',
};


export type AllEvents = StartEvents | EndEvents;
export type Listeners = {
	[key in AllEvents]: Function[];
};


export type HeadBodyElement = HTMLHeadElement | HTMLBodyElement;