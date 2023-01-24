// src/index.js
var Ladder = class LadderJS {
  #listeners = {
    once: {
      startHead: [],
      endHead: [],
      startBody: [],
      endBody: []
    }
  };
  once(eventName, callback) {
    switch (eventName) {
      case "startHead":
        {
          return this.#listeners.once.startHead.push(callback);
        }
        ;
      case "startBody":
        {
          return this.#listeners.once.startBody.push(callback);
        }
        ;
      case "endBody":
        {
          return this.#listeners.once.endBody.push(callback);
        }
        ;
      default:
        {
          throw TypeError(`${eventName} is not a valid event name.`);
        }
        ;
    }
    ;
  }
  setup() {
    const headMO = new MutationObserver((mutations) => {
      if (document.head) {
        this.#listeners.once.startHead.forEach((c) => c());
        headMO.disconnect();
      }
    });
    const bodyMO = new MutationObserver((mutations) => {
      if (document.body) {
        document.addEventListener("DOMContentLoaded", () => this.#listeners.once.endBody.forEach((c) => c()));
        this.#listeners.once.startBody.forEach((c) => c());
        bodyMO.disconnect();
      }
    });
    headMO.observe(document, { childList: true, subtree: true });
    bodyMO.observe(document, { childList: true, subtree: true });
  }
};
window.ladder = new Ladder();
