import {
	HeadBodyElement,
	Listeners,
	AllEvents, StartEvents, EndEvents,
} from "./types.js";

const exports = (() => {
	const Liner = class Liner {
		private targetDocument: HeadBodyElement;
		public constructor(doc: HeadBodyElement) {
			this.targetDocument = doc;
		};
	
		public appendCSS(css: string|string[]): Element {
			const styleElement: Element = document.createElement('style');
			if(Array.isArray(css)) {
				styleElement.innerHTML = css.join('\n');
			} else {
				styleElement.innerHTML = css;
			}
	
			return this.targetDocument.appendChild(styleElement);
		};
		public appendScript(fn: Function|Function[]): Element {
			const scriptElement: Element = document.createElement('script');
			if(Array.isArray(fn)) {
				scriptElement.innerHTML = fn.map(fn=> `(${fn})();`).join("\n");
			} else {
				scriptElement.innerHTML = `(${fn})();`;
			}
	
			return this.targetDocument.appendChild(scriptElement);
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
				case StartEvents.head: {
					this.#listeners.headStart.push(callback); break;
				};
				/*case EndEvents.head: {
					this.listeners.headEnd.push(callback); break;
				};*/
				case StartEvents.body: {
					this.#listeners.bodyStart.push(callback); break;
				};
				case EndEvents.body: {
					this.#listeners.bodyEnd.push(callback); break;
				};
				default: {
					console.warn(`Ignoring invalid event: "${eventName}"`); break;
				};
			};
		};
		public attach(): void {
			const headMO = (): void => {
				const observer: MutationObserver = new MutationObserver(() => {
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
				const observer: MutationObserver = new MutationObserver(() => {
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