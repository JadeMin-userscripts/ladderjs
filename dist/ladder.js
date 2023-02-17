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
globalThis.LadderJS = exports.LadderJS;
globalThis.ladder = new globalThis.LadderJS();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xyXG5cdEhUTUxIZWFkQm9keUVsZW1lbnQsIFN0eWxlQ3JlYXRlclBhcmFtcywgSFRNTFN0eWxlU2NyaXB0RWxlbWVudCxcclxuXHRMaXN0ZW5lcnMsXHJcblx0QWxsRXZlbnRzLCBTdGFydEV2ZW50cywgRW5kRXZlbnRzLFxyXG59IGZyb20gXCIuL3R5cGVzLmpzXCI7XHJcblxyXG5cclxuY29uc3QgZXhwb3J0cyA9ICgoKSA9PiB7XHJcblx0Y29uc3QgTGluZXIgPSBjbGFzcyBMaW5lciB7XHJcblx0XHQjdGFyZ2V0RWxlbWVudDogSFRNTEhlYWRCb2R5RWxlbWVudDtcclxuXHRcdHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlZmF1bHRFbGVtZW50OiBIVE1MSGVhZEJvZHlFbGVtZW50KSB7XHJcblx0XHRcdHRoaXMuI3RhcmdldEVsZW1lbnQgPSBkZWZhdWx0RWxlbWVudDtcclxuXHRcdH07XHJcblxyXG5cdFx0LyojY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcpOiBIVE1MU3R5bGVTY3JpcHRFbGVtZW50IHtcclxuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSkgYXMgSFRNTFN0eWxlU2NyaXB0RWxlbWVudDtcclxuXHRcdH07Ki9cclxuXHRcdHB1YmxpYyBjcmVhdGVTdHlsZShvcHRpb25zOiBTdHlsZUNyZWF0ZXJQYXJhbXNbXSk6IEhUTUxFbGVtZW50IHtcclxuXHRcdFx0Y29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHRcdFx0Y29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xyXG5cdFx0XHRvcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRjb25zdCBzdHlsZXMgPSBPYmplY3QuZW50cmllcyhvcHRpb24uc3R5bGVzKTtcclxuXHRcdFx0XHRyZXN1bHQucHVzaCguLi5zdHlsZXMubWFwKChbcHJvcCwgdmFsdWVdKT0+IGAke29wdGlvbi5zZWxlY3Rvcn17JHtwcm9wfToke3ZhbHVlfSFpbXBvcnRhbnQ7fWApKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSByZXN1bHQuam9pbignXFxuJyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy4jdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHRcdHB1YmxpYyBjcmVhdGVTY3JpcHQoZnVuY3Rpb25zOiBGdW5jdGlvbltdKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHRjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0cmVzdWx0LnB1c2goLi4uZnVuY3Rpb25zLm1hcCh0b1N0cmluZykpO1xyXG5cdFx0XHRzY3JpcHRFbGVtZW50LmlubmVySFRNTCA9IHJlc3VsdC5qb2luKCdcXG4nKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLiN0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cdGNvbnN0IExhZGRlckpTID0gY2xhc3MgTGFkZGVySlMge1xyXG5cdFx0I2xpc3RlbmVyczogTGlzdGVuZXJzID0ge1xyXG5cdFx0XHRoZWFkU3RhcnQ6IFtdLFxyXG5cdFx0XHRoZWFkRW5kOiBbXSxcclxuXHRcdFx0Ym9keVN0YXJ0OiBbXSxcclxuXHRcdFx0Ym9keUVuZDogW11cclxuXHRcdH07XHJcblx0XHJcblx0XHRwdWJsaWMgb25jZShldmVudE5hbWU6IEFsbEV2ZW50cywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XHJcblx0XHRcdHN3aXRjaChldmVudE5hbWUpIHtcclxuXHRcdFx0XHRjYXNlIFN0YXJ0RXZlbnRzLkhFQUQ6IHtcclxuXHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5oZWFkU3RhcnQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0LypjYXNlIEVuZEV2ZW50cy5IRUFEOiB7XHJcblx0XHRcdFx0XHR0aGlzLmxpc3RlbmVycy5oZWFkRW5kLnB1c2goY2FsbGJhY2spOyBicmVhaztcclxuXHRcdFx0XHR9OyovXHJcblx0XHRcdFx0Y2FzZSBTdGFydEV2ZW50cy5CT0RZOiB7XHJcblx0XHRcdFx0XHR0aGlzLiNsaXN0ZW5lcnMuYm9keVN0YXJ0LnB1c2goY2FsbGJhY2spOyBicmVhaztcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdGNhc2UgRW5kRXZlbnRzLkJPRFk6IHtcclxuXHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5ib2R5RW5kLnB1c2goY2FsbGJhY2spOyBicmVhaztcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdGRlZmF1bHQ6IHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgSWdub3JpbmcgaW52YWxpZCBldmVudDogXCIke2V2ZW50TmFtZX1cImApOyBicmVhaztcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHRcdHB1YmxpYyBhdHRhY2goKTogdm9pZCB7XHJcblx0XHRcdGNvbnN0IGhlYWRNTyA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuXHRcdFx0XHRcdGlmKGRvY3VtZW50LmhlYWQpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgbGluZXIgPSBuZXcgTGluZXIoZG9jdW1lbnQuaGVhZCk7XHJcblx0XHJcblx0XHRcdFx0XHRcdC8vdGhpcy4jbGlzdGVuZXJzLmhlYWRFbmQuZm9yRWFjaChjYWxsPT4gY2FsbChsaW5lcikpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLiNsaXN0ZW5lcnMuaGVhZFN0YXJ0LmZvckVhY2goY2FsbD0+IGNhbGwobGluZXIpKTtcclxuXHRcdFx0XHRcdFx0b2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG5cdFx0XHRcdFx0XHRib2R5TU8oKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7XHJcblx0XHRcdFx0XHRjaGlsZExpc3Q6IHRydWUsXHJcblx0XHRcdFx0XHRzdWJ0cmVlOiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHRcdGNvbnN0IGJvZHlNTyA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0XHRjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuXHRcdFx0XHRcdGlmKGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgbGluZXIgPSBuZXcgTGluZXIoZG9jdW1lbnQuYm9keSk7XHJcblx0XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpPT4gdGhpcy4jbGlzdGVuZXJzLmJvZHlFbmQuZm9yRWFjaChjYWxsPT4gY2FsbChsaW5lcikpKTtcclxuXHRcdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmJvZHlTdGFydC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSk7XHJcblx0XHRcdFx0XHRcdG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7XHJcblx0XHRcdFx0XHRjaGlsZExpc3Q6IHRydWUsXHJcblx0XHRcdFx0XHRzdWJ0cmVlOiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHJcblx0XHRcdHJldHVybiBoZWFkTU8oKTtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdExpbmVyLFxyXG5cdFx0TGFkZGVySlMsXHJcblx0fTtcclxufSkoKTtcclxuXHJcbmdsb2JhbFRoaXMuTGFkZGVySlMgPSBleHBvcnRzLkxhZGRlckpTO1xyXG5nbG9iYWxUaGlzLmxhZGRlciA9IG5ldyBnbG9iYWxUaGlzLkxhZGRlckpTKCk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQU9BLElBQU0sV0FBVyxNQUFNO0FBQ3RCLE1BQU0sUUFBUSxNQUFZO0FBQUEsSUFFbEIsWUFBb0IsZ0JBQXFDO0FBQXJDO0FBQzFCLFdBQUssaUJBQWlCO0FBQUEsSUFDdkI7QUFBQSxJQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRTyxZQUFZLFNBQTRDO0FBQzlELFVBQU0sZUFBZSxTQUFTLGNBQWMsT0FBTyxHQUM3QyxTQUFtQixDQUFDO0FBQzFCLHFCQUFRLFFBQVEsWUFBVTtBQUN6QixZQUFNLFNBQVMsT0FBTyxRQUFRLE9BQU8sTUFBTTtBQUMzQyxlQUFPLEtBQUssR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFLLEdBQUcsT0FBTyxZQUFZLFFBQVEsbUJBQW1CLENBQUM7QUFBQSxNQUMvRixDQUFDLEdBQ0QsYUFBYSxZQUFZLE9BQU8sS0FBSztBQUFBLENBQUksR0FFbEMsS0FBSyxlQUFlLFlBQVksWUFBWTtBQUFBLElBQ3BEO0FBQUEsSUFDTyxhQUFhLFdBQW9DO0FBQ3ZELFVBQU0sZ0JBQWdCLFNBQVMsY0FBYyxRQUFRLEdBQy9DLFNBQW1CLENBQUM7QUFDMUIsb0JBQU8sS0FBSyxHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsR0FDdEMsY0FBYyxZQUFZLE9BQU8sS0FBSztBQUFBLENBQUksR0FFbkMsS0FBSyxlQUFlLFlBQVksYUFBYTtBQUFBLElBQ3JEO0FBQUEsRUFDRDtBQWlFQSxTQUFPO0FBQUEsSUFDTjtBQUFBLElBQ0EsVUFsRWdCLE1BQWU7QUFBQSxNQUMvQixhQUF3QjtBQUFBLFFBQ3ZCLFdBQVcsQ0FBQztBQUFBLFFBQ1osU0FBUyxDQUFDO0FBQUEsUUFDVixXQUFXLENBQUM7QUFBQSxRQUNaLFNBQVMsQ0FBQztBQUFBLE1BQ1g7QUFBQSxNQUVPLEtBQUssV0FBc0IsVUFBMEI7QUFDM0QsZ0JBQU8sV0FBVztBQUFBLFVBQ2pCLDZCQUF1QjtBQUN0QixpQkFBSyxXQUFXLFVBQVUsS0FBSyxRQUFRO0FBQUc7QUFBQSxVQUMzQztBQUFBLFVBSUEsNkJBQXVCO0FBQ3RCLGlCQUFLLFdBQVcsVUFBVSxLQUFLLFFBQVE7QUFBRztBQUFBLFVBQzNDO0FBQUEsVUFDQSwyQkFBcUI7QUFDcEIsaUJBQUssV0FBVyxRQUFRLEtBQUssUUFBUTtBQUFHO0FBQUEsVUFDekM7QUFBQSxVQUNBLFNBQVM7QUFDUixvQkFBUSxLQUFLLDRCQUE0QixZQUFZO0FBQUc7QUFBQSxVQUN6RDtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsTUFDTyxTQUFlO0FBQ3JCLFlBQU0sU0FBUyxNQUFZO0FBQzFCLGNBQU0sV0FBVyxJQUFJLGlCQUFpQixNQUFNO0FBQzNDLGdCQUFHLFNBQVMsTUFBTTtBQUNqQixrQkFBTSxRQUFRLElBQUksTUFBTSxTQUFTLElBQUk7QUFHckMsbUJBQUssV0FBVyxVQUFVLFFBQVEsVUFBTyxLQUFLLEtBQUssQ0FBQyxHQUNwRCxTQUFTLFdBQVcsR0FDcEIsT0FBTztBQUFBO0FBQUEsVUFFVCxDQUFDO0FBQ0QsbUJBQVMsUUFBUSxVQUFVO0FBQUEsWUFDMUIsV0FBVztBQUFBLFlBQ1gsU0FBUztBQUFBLFVBQ1YsQ0FBQztBQUFBLFFBQ0YsR0FDTSxTQUFTLE1BQVk7QUFDMUIsY0FBTSxXQUFXLElBQUksaUJBQWlCLE1BQU07QUFDM0MsZ0JBQUcsU0FBUyxNQUFNO0FBQ2pCLGtCQUFNLFFBQVEsSUFBSSxNQUFNLFNBQVMsSUFBSTtBQUVyQyx1QkFBUyxpQkFBaUIsb0JBQW9CLE1BQUssS0FBSyxXQUFXLFFBQVEsUUFBUSxVQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsR0FDdEcsS0FBSyxXQUFXLFVBQVUsUUFBUSxVQUFPLEtBQUssS0FBSyxDQUFDLEdBQ3BELFNBQVMsV0FBVztBQUFBO0FBQUEsVUFFdEIsQ0FBQztBQUNELG1CQUFTLFFBQVEsVUFBVTtBQUFBLFlBQzFCLFdBQVc7QUFBQSxZQUNYLFNBQVM7QUFBQSxVQUNWLENBQUM7QUFBQSxRQUNGO0FBRUEsZUFBTyxPQUFPO0FBQUEsTUFDZjtBQUFBLElBQ0Q7QUFBQSxFQUtBO0FBQ0QsR0FBRztBQUVILFdBQVcsV0FBVyxRQUFRO0FBQzlCLFdBQVcsU0FBUyxJQUFJLFdBQVcsU0FBUzsiLAogICJuYW1lcyI6IFtdCn0K
