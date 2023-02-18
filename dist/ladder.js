// src/index.ts
var exports = (() => {
  let Liner = class {
    constructor(defaultElement) {
      this.defaultElement = defaultElement;
      this.#targetElement = defaultElement;
    }
    #targetElement;
    #createElement(tagName) {
      let element = document.createElement(tagName);
      return Object.assign(element, {
        append: () => this.#targetElement.appendChild(element)
      });
    }
    createStyle(options) {
      let styleElement = this.#createElement("style"), result = [];
      return options.forEach((option) => {
        let style = Object.entries(option.style);
        result.push(...style.map(([prop, value]) => `${option.selector}{${prop}:${value}!important;}`));
      }), styleElement.innerHTML = result.join(`
`), styleElement;
    }
    createScript(functions) {
      let scriptElement = this.#createElement("script"), result = [];
      return result.push(...functions.map(toString)), scriptElement.innerHTML = result.join(`
`), scriptElement;
    }
  };
  return {
    Liner,
    LadderJS: class {
      #listeners = {
        headStart: [],
        headEnd: [],
        bodyStart: [],
        bodyEnd: []
      };
      once(eventName, callback) {
        switch (eventName) {
          case "headStart" /* HEAD */: {
            this.#listeners.headStart.push(callback);
            break;
          }
          case "bodyStart" /* BODY */: {
            this.#listeners.bodyStart.push(callback);
            break;
          }
          case "bodyEnd" /* BODY */: {
            this.#listeners.bodyEnd.push(callback);
            break;
          }
          default: {
            console.warn(`Ignoring invalid event: "${eventName}"`);
            break;
          }
        }
      }
      attach() {
        let headMO = () => {
          let observer = new MutationObserver(() => {
            if (document.head) {
              let liner = new Liner(document.head);
              this.#listeners.headStart.forEach((call) => call(liner)), observer.disconnect(), bodyMO();
            }
          });
          observer.observe(document, {
            childList: !0,
            subtree: !0
          });
        }, bodyMO = () => {
          let observer = new MutationObserver(() => {
            if (document.body) {
              let liner = new Liner(document.body);
              document.addEventListener("DOMContentLoaded", () => this.#listeners.bodyEnd.forEach((call) => call(liner))), this.#listeners.bodyStart.forEach((call) => call(liner)), observer.disconnect();
            }
          });
          observer.observe(document, {
            childList: !0,
            subtree: !0
          });
        };
        return headMO();
      }
    }
  };
})();
globalThis.LadderJS = exports.LadderJS;
globalThis.ladder = new globalThis.LadderJS();
//# sourceMappingURL=ladder.js.map
