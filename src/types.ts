export type OnceCallback = {
	(event: any): void;
};
export type Listeners = {
	[key in StartEvents|EndEvents]: Function[]
};
export enum StartEvents {
	head = 'startHead',
	body = 'startBody',
};
export enum EndEvents {
	head = 'endHead',
	body = 'endBody',
};