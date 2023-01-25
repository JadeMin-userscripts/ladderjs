// src/index.ts
var exports = (() => {
  let Liner = class {
    targetDocument;
    constructor(doc) {
      this.targetDocument = doc;
    }
    appendCSS(css) {
      let styleElement = document.createElement("style");
      return Array.isArray(css) ? styleElement.innerHTML = css.join(`
`) : styleElement.innerHTML = css, this.targetDocument.appendChild(styleElement);
    }
    appendScript(fn) {
      let scriptElement = document.createElement("script");
      return Array.isArray(fn) ? scriptElement.innerHTML = fn.map((fn2) => `(${fn2})();`).join(`
`) : scriptElement.innerHTML = `(${fn})();`, this.targetDocument.appendChild(scriptElement);
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
          case "headStart" /* head */: {
            this.#listeners.headStart.push(callback);
            break;
          }
          case "bodyStart" /* body */: {
            this.#listeners.bodyStart.push(callback);
            break;
          }
          case "bodyEnd" /* body */: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xyXG5cdEhlYWRCb2R5RWxlbWVudCxcclxuXHRMaXN0ZW5lcnMsXHJcblx0QWxsRXZlbnRzLCBTdGFydEV2ZW50cywgRW5kRXZlbnRzLFxyXG59IGZyb20gXCIuL3R5cGVzLmpzXCI7XHJcblxyXG5jb25zdCBleHBvcnRzID0gKCgpID0+IHtcclxuXHRjb25zdCBMaW5lciA9IGNsYXNzIExpbmVyIHtcclxuXHRcdHByaXZhdGUgdGFyZ2V0RG9jdW1lbnQ6IEhlYWRCb2R5RWxlbWVudDtcclxuXHRcdHB1YmxpYyBjb25zdHJ1Y3Rvcihkb2M6IEhlYWRCb2R5RWxlbWVudCkge1xyXG5cdFx0XHR0aGlzLnRhcmdldERvY3VtZW50ID0gZG9jO1xyXG5cdFx0fTtcclxuXHRcclxuXHRcdHB1YmxpYyBhcHBlbmRDU1MoY3NzOiBzdHJpbmd8c3RyaW5nW10pOiBFbGVtZW50IHtcclxuXHRcdFx0Y29uc3Qgc3R5bGVFbGVtZW50OiBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHRcdFx0aWYoQXJyYXkuaXNBcnJheShjc3MpKSB7XHJcblx0XHRcdFx0c3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGNzcy5qb2luKCdcXG4nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gY3NzO1xyXG5cdFx0XHR9XHJcblx0XHJcblx0XHRcdHJldHVybiB0aGlzLnRhcmdldERvY3VtZW50LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdFx0cHVibGljIGFwcGVuZFNjcmlwdChmbjogRnVuY3Rpb258RnVuY3Rpb25bXSk6IEVsZW1lbnQge1xyXG5cdFx0XHRjb25zdCBzY3JpcHRFbGVtZW50OiBFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdGlmKEFycmF5LmlzQXJyYXkoZm4pKSB7XHJcblx0XHRcdFx0c2NyaXB0RWxlbWVudC5pbm5lckhUTUwgPSBmbi5tYXAoZm49PiBgKCR7Zm59KSgpO2ApLmpvaW4oXCJcXG5cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2NyaXB0RWxlbWVudC5pbm5lckhUTUwgPSBgKCR7Zm59KSgpO2A7XHJcblx0XHRcdH1cclxuXHRcclxuXHRcdFx0cmV0dXJuIHRoaXMudGFyZ2V0RG9jdW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH07XHJcblx0Y29uc3QgTGFkZGVySlMgPSBjbGFzcyBMYWRkZXJKUyB7XHJcblx0XHQjbGlzdGVuZXJzOiBMaXN0ZW5lcnMgPSB7XHJcblx0XHRcdGhlYWRTdGFydDogW10sXHJcblx0XHRcdGhlYWRFbmQ6IFtdLFxyXG5cdFx0XHRib2R5U3RhcnQ6IFtdLFxyXG5cdFx0XHRib2R5RW5kOiBbXVxyXG5cdFx0fTtcclxuXHRcclxuXHRcdHB1YmxpYyBvbmNlKGV2ZW50TmFtZTogQWxsRXZlbnRzLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuXHRcdFx0c3dpdGNoKGV2ZW50TmFtZSkge1xyXG5cdFx0XHRcdGNhc2UgU3RhcnRFdmVudHMuaGVhZDoge1xyXG5cdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmhlYWRTdGFydC5wdXNoKGNhbGxiYWNrKTsgYnJlYWs7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHQvKmNhc2UgRW5kRXZlbnRzLmhlYWQ6IHtcclxuXHRcdFx0XHRcdHRoaXMubGlzdGVuZXJzLmhlYWRFbmQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07Ki9cclxuXHRcdFx0XHRjYXNlIFN0YXJ0RXZlbnRzLmJvZHk6IHtcclxuXHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5ib2R5U3RhcnQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Y2FzZSBFbmRFdmVudHMuYm9keToge1xyXG5cdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmJvZHlFbmQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZGVmYXVsdDoge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBJZ25vcmluZyBpbnZhbGlkIGV2ZW50OiBcIiR7ZXZlbnROYW1lfVwiYCk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0cHVibGljIGF0dGFjaCgpOiB2b2lkIHtcclxuXHRcdFx0Y29uc3QgaGVhZE1PID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoZG9jdW1lbnQuaGVhZCkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lciA9IG5ldyBMaW5lcihkb2N1bWVudC5oZWFkKTtcclxuXHRcclxuXHRcdFx0XHRcdFx0Ly90aGlzLiNsaXN0ZW5lcnMuaGVhZEVuZC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5oZWFkU3RhcnQuZm9yRWFjaChjYWxsPT4gY2FsbChsaW5lcikpO1xyXG5cdFx0XHRcdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcblx0XHRcdFx0XHRcdGJvZHlNTygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRcdHN1YnRyZWU6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uc3QgYm9keU1PID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lciA9IG5ldyBMaW5lcihkb2N1bWVudC5ib2R5KTtcclxuXHRcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PiB0aGlzLiNsaXN0ZW5lcnMuYm9keUVuZC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSkpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLiNsaXN0ZW5lcnMuYm9keVN0YXJ0LmZvckVhY2goY2FsbD0+IGNhbGwobGluZXIpKTtcclxuXHRcdFx0XHRcdFx0b2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRcdHN1YnRyZWU6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcclxuXHRcdFx0cmV0dXJuIGhlYWRNTygpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0TGluZXIsXHJcblx0XHRMYWRkZXJKUyxcclxuXHR9O1xyXG59KSgpO1xyXG5nbG9iYWxUaGlzLkxhZGRlckpTID0gZXhwb3J0cy5MYWRkZXJKUztcclxuZ2xvYmFsVGhpcy5sYWRkZXIgPSBuZXcgZ2xvYmFsVGhpcy5MYWRkZXJKUygpOyJdLAogICJtYXBwaW5ncyI6ICI7QUFNQSxJQUFNLFdBQVcsTUFBTTtBQUN0QixNQUFNLFFBQVEsTUFBWTtBQUFBLElBQ2pCO0FBQUEsSUFDRCxZQUFZLEtBQXNCO0FBQ3hDLFdBQUssaUJBQWlCO0FBQUEsSUFDdkI7QUFBQSxJQUVPLFVBQVUsS0FBK0I7QUFDL0MsVUFBTSxlQUF3QixTQUFTLGNB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
