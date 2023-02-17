import {
	HTMLHeadBodyElement, StyleCreaterParams, HTMLStyleScriptElement,
	Listeners,
	AllEvents, StartEvents, EndEvents,
} from "./types.js";


const exports = (() => {
	const Liner = class Liner {
		#targetElement: HTMLHeadBodyElement;
		public constructor(private defaultElement: HTMLHeadBodyElement) {
			this.#targetElement = defaultElement;
		};

		#createElement(tagName: string): HTMLStyleScriptElement {
			const element = document.createElement(tagName) as HTMLStyleScriptElement;
			return Object.assign(element, {
				append: ()=> this.#targetElement.appendChild(element),
			});
		};
		public createStyle(options: StyleCreaterParams[]): HTMLElement {
			const styleElement = this.#createElement('style');
			const result: string[] = [];
			options.forEach(option => {
				const styles = Object.entries(option.styles);
				result.push(...styles.map(([prop, value])=> `${option.selector}{${prop}:${value}!important;}`));
			});
			styleElement.innerHTML = result.join('\n');

			return styleElement;
		};
		public createScript(functions: Function[]): HTMLElement {
			const scriptElement = this.#createElement('script');
			const result: string[] = [];
			result.push(...functions.map(toString));
			scriptElement.innerHTML = result.join('\n');

			return scriptElement;
		};
	};
	const LadderJS = class LadderJS {
		#listeners: Listeners = {
			headStart: [],
			headEnd: [],
			bodyStart: [],
			bodyEnd: []
		};
	
		public once(eventName: AllEvents, callback: Function): void {
			switch(eventName) {
				case StartEvents.HEAD: {
					this.#listeners.headStart.push(callback); break;
				};
				/*case EndEvents.HEAD: {
					this.listeners.headEnd.push(callback); break;
				};*/
				case StartEvents.BODY: {
					this.#listeners.bodyStart.push(callback); break;
				};
				case EndEvents.BODY: {
					this.#listeners.bodyEnd.push(callback); break;
				};
				default: {
					console.warn(`Ignoring invalid event: "${eventName}"`); break;
				};
			};
		};
		public attach(): void {
			const headMO = (): void => {
				const observer = new MutationObserver(() => {
					if(document.head) {
						const liner = new Liner(document.head);
	
						//this.#listeners.headEnd.forEach(call=> call(liner));
						this.#listeners.headStart.forEach(call=> call(liner));
						observer.disconnect();
						bodyMO();
					}
				});
				observer.observe(document, {
					childList: true,
					subtree: true
				});
			};
			const bodyMO = (): void => {
				const observer = new MutationObserver(() => {
					if(document.body) {
						const liner = new Liner(document.body);
	
						document.addEventListener("DOMContentLoaded", ()=> this.#listeners.bodyEnd.forEach(call=> call(liner)));
						this.#listeners.bodyStart.forEach(call=> call(liner));
						observer.disconnect();
					}
				});
				observer.observe(document, {
					childList: true,
					subtree: true
				});
			};
	
			return headMO();
		};
	};

	return {
		Liner,
		LadderJS,
	};
})();

globalThis.LadderJS = exports.LadderJS;
globalThis.ladder = new globalThis.LadderJS();