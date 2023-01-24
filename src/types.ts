export enum StartEvents {
	head = 'startHead',
	body = 'startBody',
};
export enum EndEvents {
	head = 'endHead',
	body = 'endBody',
};
export type OnceCallback = {
	(event: MutationRecord[] | Object): void;
};
export type Listeners = {
	[key in StartEvents | EndEvents]: OnceCallback[];
};
export type Events = StartEvents | EndEvents;