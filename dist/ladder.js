// src/index.ts
var exports = (() => {
  let Liner = class {
    constructor(defaultElement) {
      this.defaultElement = defaultElement;
      this.#targetElement = defaultElement;
    }
    #targetElement;
    /*#createElement(tagName: string): HTMLStyleScriptElement {
    	return document.createElement(tagName) as HTMLStyleScriptElement;
    };*/
    createStyle(options) {
      let styleElement = document.createElement("style"), result = [];
      return options.forEach((option) => {
        let styles = Object.entries(option.styles);
        result.push(...styles.map(([prop, value]) => `${option.selector}{${prop}:${value}!important;}`));
      }), styleElement.innerHTML = result.join(`
`), this.#targetElement.appendChild(styleElement);
    }
    createScript(functions) {
      let scriptElement = document.createElement("script"), result = [];
      return result.push(...functions.map(toString)), scriptElement.innerHTML = result.join(`
`), this.#targetElement.appendChild(scriptElement);
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
globalThis.Liner = exports.Liner;
globalThis.LadderJS = exports.LadderJS;
globalThis.ladder = new globalThis.LadderJS();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xyXG5cdEhUTUxIZWFkQm9keUVsZW1lbnQsIFN0eWxlQ3JlYXRlclBhcmFtcywgSFRNTFN0eWxlU2NyaXB0RWxlbWVudCxcclxuXHRMaXN0ZW5lcnMsXHJcblx0QWxsRXZlbnRzLCBTdGFydEV2ZW50cywgRW5kRXZlbnRzLFxyXG59IGZyb20gXCIuL3R5cGVzLmpzXCI7XHJcblxyXG5jb25zdCBleHBvcnRzID0gKCgpID0+IHtcclxuXHRjb25zdCBMaW5lciA9IGNsYXNzIExpbmVyIHtcclxuXHRcdCN0YXJnZXRFbGVtZW50OiBIVE1MSGVhZEJvZHlFbGVtZW50O1xyXG5cdFx0cHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVmYXVsdEVsZW1lbnQ6IEhUTUxIZWFkQm9keUVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy4jdGFyZ2V0RWxlbWVudCA9IGRlZmF1bHRFbGVtZW50O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiNjcmVhdGVFbGVtZW50KHRhZ05hbWU6IHN0cmluZyk6IEhUTUxTdHlsZVNjcmlwdEVsZW1lbnQge1xyXG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKSBhcyBIVE1MU3R5bGVTY3JpcHRFbGVtZW50O1xyXG5cdFx0fTsqL1xyXG5cdFx0cHVibGljIGNyZWF0ZVN0eWxlKG9wdGlvbnM6IFN0eWxlQ3JlYXRlclBhcmFtc1tdKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHRjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cdFx0XHRjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHN0eWxlcyA9IE9iamVjdC5lbnRyaWVzKG9wdGlvbi5zdHlsZXMpO1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKC4uLnN0eWxlcy5tYXAoKFtwcm9wLCB2YWx1ZV0pPT4gYCR7b3B0aW9uLnNlbGVjdG9yfXske3Byb3B9OiR7dmFsdWV9IWltcG9ydGFudDt9YCkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmlubmVySFRNTCA9IHJlc3VsdC5qb2luKCdcXG4nKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLiN0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdFx0cHVibGljIGNyZWF0ZVNjcmlwdChmdW5jdGlvbnM6IEZ1bmN0aW9uW10pOiBIVE1MRWxlbWVudCB7XHJcblx0XHRcdGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0Y29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0XHRyZXN1bHQucHVzaCguLi5mdW5jdGlvbnMubWFwKHRvU3RyaW5nKSk7XHJcblx0XHRcdHNjcmlwdEVsZW1lbnQuaW5uZXJIVE1MID0gcmVzdWx0LmpvaW4oJ1xcbicpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuI3RhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH07XHJcblx0Y29uc3QgTGFkZGVySlMgPSBjbGFzcyBMYWRkZXJKUyB7XHJcblx0XHQjbGlzdGVuZXJzOiBMaXN0ZW5lcnMgPSB7XHJcblx0XHRcdGhlYWRTdGFydDogW10sXHJcblx0XHRcdGhlYWRFbmQ6IFtdLFxyXG5cdFx0XHRib2R5U3RhcnQ6IFtdLFxyXG5cdFx0XHRib2R5RW5kOiBbXVxyXG5cdFx0fTtcclxuXHRcclxuXHRcdHB1YmxpYyBvbmNlKGV2ZW50TmFtZTogQWxsRXZlbnRzLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuXHRcdFx0c3dpdGNoKGV2ZW50TmFtZSkge1xyXG5cdFx0XHRcdGNhc2UgU3RhcnRFdmVudHMuSEVBRDoge1xyXG5cdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmhlYWRTdGFydC5wdXNoKGNhbGxiYWNrKTsgYnJlYWs7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHQvKmNhc2UgRW5kRXZlbnRzLkhFQUQ6IHtcclxuXHRcdFx0XHRcdHRoaXMubGlzdGVuZXJzLmhlYWRFbmQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07Ki9cclxuXHRcdFx0XHRjYXNlIFN0YXJ0RXZlbnRzLkJPRFk6IHtcclxuXHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5ib2R5U3RhcnQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Y2FzZSBFbmRFdmVudHMuQk9EWToge1xyXG5cdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmJvZHlFbmQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZGVmYXVsdDoge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBJZ25vcmluZyBpbnZhbGlkIGV2ZW50OiBcIiR7ZXZlbnROYW1lfVwiYCk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0cHVibGljIGF0dGFjaCgpOiB2b2lkIHtcclxuXHRcdFx0Y29uc3QgaGVhZE1PID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoZG9jdW1lbnQuaGVhZCkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lciA9IG5ldyBMaW5lcihkb2N1bWVudC5oZWFkKTtcclxuXHRcclxuXHRcdFx0XHRcdFx0Ly90aGlzLiNsaXN0ZW5lcnMuaGVhZEVuZC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5oZWFkU3RhcnQuZm9yRWFjaChjYWxsPT4gY2FsbChsaW5lcikpO1xyXG5cdFx0XHRcdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcblx0XHRcdFx0XHRcdGJvZHlNTygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRcdHN1YnRyZWU6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uc3QgYm9keU1PID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lciA9IG5ldyBMaW5lcihkb2N1bWVudC5ib2R5KTtcclxuXHRcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PiB0aGlzLiNsaXN0ZW5lcnMuYm9keUVuZC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSkpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLiNsaXN0ZW5lcnMuYm9keVN0YXJ0LmZvckVhY2goY2FsbD0+IGNhbGwobGluZXIpKTtcclxuXHRcdFx0XHRcdFx0b2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRcdHN1YnRyZWU6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcclxuXHRcdFx0cmV0dXJuIGhlYWRNTygpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0TGluZXIsXHJcblx0XHRMYWRkZXJKUyxcclxuXHR9O1xyXG59KSgpO1xyXG5nbG9iYWxUaGlzLkxpbmVyID0gZXhwb3J0cy5MaW5lcjtcclxuZ2xvYmFsVGhpcy5MYWRkZXJKUyA9IGV4cG9ydHMuTGFkZGVySlM7XHJcbmdsb2JhbFRoaXMubGFkZGVyID0gbmV3IGdsb2JhbFRoaXMuTGFkZGVySlMoKTsiXSwKICAibWFwcGluZ3MiOiAiO0FBTUEsSUFBTSxXQUFXLE1BQU07QUFDdEIsTUFBTSxRQUFRLE1BQVk7QUFBQSxJQUVsQixZQUFvQixnQkFBcUM7QUFBckM7QUFDMUIsV0FBSyxpQkFBaUI7QUFBQSxJQUN2QjtBQUFBLElBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVFPLFlBQVksU0FBNEM7QUFDOUQsVUFBTSxlQUFlLFNBQVMsY0FBYyxPQUFPLEdBQzdDLFNBQW1CLENBQUM7QUFDMUIscUJBQVEsUUFBUSxZQUFVO0FBQ3pCLFlBQU0sU0FBUyxPQUFPLFFBQVEsT0FBTyxNQUFNO0FBQzNDLGVBQU8sS0FBSyxHQUFHLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQUssR0FBRyxPQUFPLFlBQVksUUFBUSxtQkFBbUIsQ0FBQztBQUFBLE1BQy9GLENBQUMsR0FDRCxhQUFhLFlBQVksT0FBTyxLQUFLO0FBQUEsQ0FBSSxHQUVsQyxLQUFLLGVBQWUsWUFBWSxZQUFZO0FBQUEsSUFDcEQ7QUFBQSxJQUNPLGFBQWEsV0FBb0M7QUFDdkQsVUFBTSxnQkFBZ0IsU0FBUyxjQUFjLFFBQVEsR0FDL0MsU0FBbUIsQ0FBQztBQUMxQixvQkFBTyxLQUFLLEdBQUcsVUFBVSxJQUFJLFFBQVEsQ0FBQyxHQUN0QyxjQUFjLFlBQVksT0FBTyxLQUFLO0FBQUEsQ0FBSSxHQUVuQyxLQUFLLGVBQWUsWUFBWSxhQUFhO0FBQUEsSUFDckQ7QUFBQSxFQUNEO0FBaUVBLFNBQU87QUFBQSxJQUNOO0FBQUEsSUFDQSxVQWxFZ0IsTUFBZTtBQUFBLE1BQy9CLGFBQXdCO0FBQUEsUUFDdkIsV0FBVyxDQUFDO0FBQUEsUUFDWixTQUFTLENBQUM7QUFBQSxRQUNWLFdBQVcsQ0FBQztBQUFBLFFBQ1osU0FBUyxDQUFDO0FBQUEsTUFDWDtBQUFBLE1BRU8sS0FBSyxXQUFzQixVQUEwQjtBQUMzRCxnQkFBTyxXQUFXO0FBQUEsVUFDakIsNkJBQXVCO0FBQ3RCLGlCQUFLLFdBQVcsVUFBVSxLQUFLLFFBQVE7QUFBRztBQUFBLFVBQzNDO0FBQUEsVUFJQSw2QkFBdUI7QUFDdEIsaUJBQUssV0FBVyxVQUFVLEtBQUssUUFBUTtBQUFHO0FBQUEsVUFDM0M7QUFBQSxVQUNBLDJCQUFxQjtBQUNwQixpQkFBSyxXQUFXLFFBQVEsS0FBSyxRQUFRO0FBQUc7QUFBQSxVQUN6QztBQUFBLFVBQ0EsU0FBUztBQUNSLG9CQUFRLEtBQUssNEJBQTRCLFlBQVk7QUFBRztBQUFBLFVBQ3pEO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNPLFNBQWU7QUFDckIsWUFBTSxTQUFTLE1BQVk7QUFDMUIsY0FBTSxXQUFXLElBQUksaUJBQWlCLE1BQU07QUFDM0MsZ0JBQUcsU0FBUyxNQUFNO0FBQ2pCLGtCQUFNLFFBQVEsSUFBSSxNQUFNLFNBQVMsSUFBSTtBQUdyQyxtQkFBSyxXQUFXLFVBQVUsUUFBUSxVQUFPLEtBQUssS0FBSyxDQUFDLEdBQ3BELFNBQVMsV0FBVyxHQUNwQixPQUFPO0FBQUE7QUFBQSxVQUVULENBQUM7QUFDRCxtQkFBUyxRQUFRLFVBQVU7QUFBQSxZQUMxQixXQUFXO0FBQUEsWUFDWCxTQUFTO0FBQUEsVUFDVixDQUFDO0FBQUEsUUFDRixHQUNNLFNBQVMsTUFBWTtBQUMxQixjQUFNLFdBQVcsSUFBSSxpQkFBaUIsTUFBTTtBQUMzQyxnQkFBRyxTQUFTLE1BQU07QUFDakIsa0JBQU0sUUFBUSxJQUFJLE1BQU0sU0FBUyxJQUFJO0FBRXJDLHVCQUFTLGlCQUFpQixvQkFBb0IsTUFBSyxLQUFLLFdBQVcsUUFBUSxRQUFRLFVBQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUN0RyxLQUFLLFdBQVcsVUFBVSxRQUFRLFVBQU8sS0FBSyxLQUFLLENBQUMsR0FDcEQsU0FBUyxXQUFXO0FBQUE7QUFBQSxVQUV0QixDQUFDO0FBQ0QsbUJBQVMsUUFBUSxVQUFVO0FBQUEsWUFDMUIsV0FBVztBQUFBLFlBQ1gsU0FBUztBQUFBLFVBQ1YsQ0FBQztBQUFBLFFBQ0Y7QUFFQSxlQUFPLE9BQU87QUFBQSxNQUNmO0FBQUEsSUFDRDtBQUFBLEVBS0E7QUFDRCxHQUFHO0FBQ0gsV0FBVyxRQUFRLFFBQVE7QUFDM0IsV0FBVyxXQUFXLFFBQVE7QUFDOUIsV0FBVyxTQUFTLElBQUksV0FBVyxTQUFTOyIsCiAgIm5hbWVzIjogW10KfQo=
