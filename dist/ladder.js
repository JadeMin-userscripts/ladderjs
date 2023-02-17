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
        let css = Object.entries(option.css);
        result.push(...css.map(([prop, value]) => `${option.selector}{${prop}:${value}!important;}`));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xyXG5cdEhUTUxIZWFkQm9keUVsZW1lbnQsIFN0eWxlQ3JlYXRlclBhcmFtcywgSFRNTFN0eWxlU2NyaXB0RWxlbWVudCxcclxuXHRMaXN0ZW5lcnMsXHJcblx0QWxsRXZlbnRzLCBTdGFydEV2ZW50cywgRW5kRXZlbnRzLFxyXG59IGZyb20gXCIuL3R5cGVzLmpzXCI7XHJcblxyXG5cclxuY29uc3QgZXhwb3J0cyA9ICgoKSA9PiB7XHJcblx0Y29uc3QgTGluZXIgPSBjbGFzcyBMaW5lciB7XHJcblx0XHQjdGFyZ2V0RWxlbWVudDogSFRNTEhlYWRCb2R5RWxlbWVudDtcclxuXHRcdHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlZmF1bHRFbGVtZW50OiBIVE1MSGVhZEJvZHlFbGVtZW50KSB7XHJcblx0XHRcdHRoaXMuI3RhcmdldEVsZW1lbnQgPSBkZWZhdWx0RWxlbWVudDtcclxuXHRcdH07XHJcblxyXG5cdFx0I2NyZWF0ZUVsZW1lbnQodGFnTmFtZTogc3RyaW5nKTogSFRNTFN0eWxlU2NyaXB0RWxlbWVudCB7XHJcblx0XHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpIGFzIEhUTUxTdHlsZVNjcmlwdEVsZW1lbnQ7XHJcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHtcclxuXHRcdFx0XHRhcHBlbmQ6ICgpPT4gdGhpcy4jdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KSxcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdFx0cHVibGljIGNyZWF0ZVN0eWxlKG9wdGlvbnM6IFN0eWxlQ3JlYXRlclBhcmFtc1tdKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHRjb25zdCBzdHlsZUVsZW1lbnQgPSB0aGlzLiNjcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cdFx0XHRjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGNzcyA9IE9iamVjdC5lbnRyaWVzKG9wdGlvbi5jc3MpO1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKC4uLmNzcy5tYXAoKFtwcm9wLCB2YWx1ZV0pPT4gYCR7b3B0aW9uLnNlbGVjdG9yfXske3Byb3B9OiR7dmFsdWV9IWltcG9ydGFudDt9YCkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmlubmVySFRNTCA9IHJlc3VsdC5qb2luKCdcXG4nKTtcclxuXHJcblx0XHRcdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcblx0XHR9O1xyXG5cdFx0cHVibGljIGNyZWF0ZVNjcmlwdChmdW5jdGlvbnM6IEZ1bmN0aW9uW10pOiBIVE1MRWxlbWVudCB7XHJcblx0XHRcdGNvbnN0IHNjcmlwdEVsZW1lbnQgPSB0aGlzLiNjcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0Y29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0XHRyZXN1bHQucHVzaCguLi5mdW5jdGlvbnMubWFwKHRvU3RyaW5nKSk7XHJcblx0XHRcdHNjcmlwdEVsZW1lbnQuaW5uZXJIVE1MID0gcmVzdWx0LmpvaW4oJ1xcbicpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNjcmlwdEVsZW1lbnQ7XHJcblx0XHR9O1xyXG5cdH07XHJcblx0Y29uc3QgTGFkZGVySlMgPSBjbGFzcyBMYWRkZXJKUyB7XHJcblx0XHQjbGlzdGVuZXJzOiBMaXN0ZW5lcnMgPSB7XHJcblx0XHRcdGhlYWRTdGFydDogW10sXHJcblx0XHRcdGhlYWRFbmQ6IFtdLFxyXG5cdFx0XHRib2R5U3RhcnQ6IFtdLFxyXG5cdFx0XHRib2R5RW5kOiBbXVxyXG5cdFx0fTtcclxuXHRcclxuXHRcdHB1YmxpYyBvbmNlKGV2ZW50TmFtZTogQWxsRXZlbnRzLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuXHRcdFx0c3dpdGNoKGV2ZW50TmFtZSkge1xyXG5cdFx0XHRcdGNhc2UgU3RhcnRFdmVudHMuSEVBRDoge1xyXG5cdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmhlYWRTdGFydC5wdXNoKGNhbGxiYWNrKTsgYnJlYWs7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHQvKmNhc2UgRW5kRXZlbnRzLkhFQUQ6IHtcclxuXHRcdFx0XHRcdHRoaXMubGlzdGVuZXJzLmhlYWRFbmQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07Ki9cclxuXHRcdFx0XHRjYXNlIFN0YXJ0RXZlbnRzLkJPRFk6IHtcclxuXHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5ib2R5U3RhcnQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Y2FzZSBFbmRFdmVudHMuQk9EWToge1xyXG5cdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmJvZHlFbmQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZGVmYXVsdDoge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGBJZ25vcmluZyBpbnZhbGlkIGV2ZW50OiBcIiR7ZXZlbnROYW1lfVwiYCk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdFx0cHVibGljIGF0dGFjaCgpOiB2b2lkIHtcclxuXHRcdFx0Y29uc3QgaGVhZE1PID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoZG9jdW1lbnQuaGVhZCkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lciA9IG5ldyBMaW5lcihkb2N1bWVudC5oZWFkKTtcclxuXHRcclxuXHRcdFx0XHRcdFx0Ly90aGlzLiNsaXN0ZW5lcnMuaGVhZEVuZC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5oZWFkU3RhcnQuZm9yRWFjaChjYWxsPT4gY2FsbChsaW5lcikpO1xyXG5cdFx0XHRcdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcblx0XHRcdFx0XHRcdGJvZHlNTygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRcdHN1YnRyZWU6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uc3QgYm9keU1PID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYoZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBsaW5lciA9IG5ldyBMaW5lcihkb2N1bWVudC5ib2R5KTtcclxuXHRcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PiB0aGlzLiNsaXN0ZW5lcnMuYm9keUVuZC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSkpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLiNsaXN0ZW5lcnMuYm9keVN0YXJ0LmZvckVhY2goY2FsbD0+IGNhbGwobGluZXIpKTtcclxuXHRcdFx0XHRcdFx0b2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRcdHN1YnRyZWU6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcclxuXHRcdFx0cmV0dXJuIGhlYWRNTygpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0TGluZXIsXHJcblx0XHRMYWRkZXJKUyxcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZ2xvYmFsVGhpcy5MYWRkZXJKUyA9IGV4cG9ydHMuTGFkZGVySlM7XHJcbmdsb2JhbFRoaXMubGFkZGVyID0gbmV3IGdsb2JhbFRoaXMuTGFkZGVySlMoKTsiXSwKICAibWFwcGluZ3MiOiAiO0FBT0EsSUFBTSxXQUFXLE1BQU07QUFDdEIsTUFBTSxRQUFRLE1BQVk7QUFBQSxJQUVsQixZQUFvQixnQkFBcUM7QUFBckM7QUFDMUIsV0FBSyxpQkFBaUI7QUFBQSxJQUN2QjtBQUFBLElBSEE7QUFBQSxJQUtBLGVBQWUsU0FBeUM7QUFDdkQsVUFBTSxVQUFVLFNBQVMsY0FBYyxPQUFPO0FBQzlDLGFBQU8sT0FBTyxPQUFPLFNBQVM7QUFBQSxRQUM3QixRQUFRLE1BQUssS0FBSyxlQUFlLFlBQVksT0FBTztBQUFBLE1BQ3JELENBQUM7QUFBQSxJQUNGO0FBQUEsSUFDTyxZQUFZLFNBQTRDO0FBQzlELFVBQU0sZUFBZSxLQUFLLGVBQWUsT0FBTyxHQUMxQyxTQUFtQixDQUFDO0FBQzFCLHFCQUFRLFFBQVEsWUFBVTtBQUN6QixZQUFNLE1BQU0sT0FBTyxRQUFRLE9BQU8sR0FBRztBQUNyQyxlQUFPLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFLLEdBQUcsT0FBTyxZQUFZLFFBQVEsbUJBQW1CLENBQUM7QUFBQSxNQUM1RixDQUFDLEdBQ0QsYUFBYSxZQUFZLE9BQU8sS0FBSztBQUFBLENBQUksR0FFbEM7QUFBQSxJQUNSO0FBQUEsSUFDTyxhQUFhLFdBQW9DO0FBQ3ZELFVBQU0sZ0JBQWdCLEtBQUssZUFBZSxRQUFRLEdBQzVDLFNBQW1CLENBQUM7QUFDMUIsb0JBQU8sS0FBSyxHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsR0FDdEMsY0FBYyxZQUFZLE9BQU8sS0FBSztBQUFBLENBQUksR0FFbkM7QUFBQSxJQUNSO0FBQUEsRUFDRDtBQWlFQSxTQUFPO0FBQUEsSUFDTjtBQUFBLElBQ0EsVUFsRWdCLE1BQWU7QUFBQSxNQUMvQixhQUF3QjtBQUFBLFFBQ3ZCLFdBQVcsQ0FBQztBQUFBLFFBQ1osU0FBUyxDQUFDO0FBQUEsUUFDVixXQUFXLENBQUM7QUFBQSxRQUNaLFNBQVMsQ0FBQztBQUFBLE1BQ1g7QUFBQSxNQUVPLEtBQUssV0FBc0IsVUFBMEI7QUFDM0QsZ0JBQU8sV0FBVztBQUFBLFVBQ2pCLDZCQUF1QjtBQUN0QixpQkFBSyxXQUFXLFVBQVUsS0FBSyxRQUFRO0FBQUc7QUFBQSxVQUMzQztBQUFBLFVBSUEsNkJBQXVCO0FBQ3RCLGlCQUFLLFdBQVcsVUFBVSxLQUFLLFFBQVE7QUFBRztBQUFBLFVBQzNDO0FBQUEsVUFDQSwyQkFBcUI7QUFDcEIsaUJBQUssV0FBVyxRQUFRLEtBQUssUUFBUTtBQUFHO0FBQUEsVUFDekM7QUFBQSxVQUNBLFNBQVM7QUFDUixvQkFBUSxLQUFLLDRCQUE0QixZQUFZO0FBQUc7QUFBQSxVQUN6RDtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsTUFDTyxTQUFlO0FBQ3JCLFlBQU0sU0FBUyxNQUFZO0FBQzFCLGNBQU0sV0FBVyxJQUFJLGlCQUFpQixNQUFNO0FBQzNDLGdCQUFHLFNBQVMsTUFBTTtBQUNqQixrQkFBTSxRQUFRLElBQUksTUFBTSxTQUFTLElBQUk7QUFHckMsbUJBQUssV0FBVyxVQUFVLFFBQVEsVUFBTyxLQUFLLEtBQUssQ0FBQyxHQUNwRCxTQUFTLFdBQVcsR0FDcEIsT0FBTztBQUFBO0FBQUEsVUFFVCxDQUFDO0FBQ0QsbUJBQVMsUUFBUSxVQUFVO0FBQUEsWUFDMUIsV0FBVztBQUFBLFlBQ1gsU0FBUztBQUFBLFVBQ1YsQ0FBQztBQUFBLFFBQ0YsR0FDTSxTQUFTLE1BQVk7QUFDMUIsY0FBTSxXQUFXLElBQUksaUJBQWlCLE1BQU07QUFDM0MsZ0JBQUcsU0FBUyxNQUFNO0FBQ2pCLGtCQUFNLFFBQVEsSUFBSSxNQUFNLFNBQVMsSUFBSTtBQUVyQyx1QkFBUyxpQkFBaUIsb0JBQW9CLE1BQUssS0FBSyxXQUFXLFFBQVEsUUFBUSxVQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsR0FDdEcsS0FBSyxXQUFXLFVBQVUsUUFBUSxVQUFPLEtBQUssS0FBSyxDQUFDLEdBQ3BELFNBQVMsV0FBVztBQUFBO0FBQUEsVUFFdEIsQ0FBQztBQUNELG1CQUFTLFFBQVEsVUFBVTtBQUFBLFlBQzFCLFdBQVc7QUFBQSxZQUNYLFNBQVM7QUFBQSxVQUNWLENBQUM7QUFBQSxRQUNGO0FBRUEsZUFBTyxPQUFPO0FBQUEsTUFDZjtBQUFBLElBQ0Q7QUFBQSxFQUtBO0FBQ0QsR0FBRztBQUVILFdBQVcsV0FBVyxRQUFRO0FBQzlCLFdBQVcsU0FBUyxJQUFJLFdBQVcsU0FBUzsiLAogICJuYW1lcyI6IFtdCn0K
