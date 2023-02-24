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
          case StartEvents.HEAD: {
            this.#listeners.headStart.push(callback);
            break;
          }
          case StartEvents.BODY: {
            this.#listeners.bodyStart.push(callback);
            break;
          }
          case EndEvents.BODY: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XHJcblx0SFRNTEhlYWRCb2R5RWxlbWVudCwgU3R5bGVDcmVhdGVyUGFyYW1zLCBIVE1MU3R5bGVTY3JpcHRFbGVtZW50LFxyXG5cdExpc3RlbmVycyxcclxuXHRBbGxFdmVudHMsIFN0YXJ0RXZlbnRzLCBFbmRFdmVudHMsXHJcbn0gZnJvbSBcIi4vdHlwZXMuanNcIjtcclxuXHJcblxyXG5jb25zdCBleHBvcnRzID0gKCgpID0+IHtcclxuXHRjb25zdCBMaW5lciA9IGNsYXNzIExpbmVyIHtcclxuXHRcdCN0YXJnZXRFbGVtZW50OiBIVE1MSGVhZEJvZHlFbGVtZW50O1xyXG5cdFx0cHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVmYXVsdEVsZW1lbnQ6IEhUTUxIZWFkQm9keUVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy4jdGFyZ2V0RWxlbWVudCA9IGRlZmF1bHRFbGVtZW50O1xyXG5cdFx0fTtcclxuXHJcblx0XHQjY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcpOiBIVE1MU3R5bGVTY3JpcHRFbGVtZW50IHtcclxuXHRcdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSkgYXMgSFRNTFN0eWxlU2NyaXB0RWxlbWVudDtcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZWxlbWVudCwge1xyXG5cdFx0XHRcdGFwcGVuZDogKCk9PiB0aGlzLiN0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpLFxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0XHRwdWJsaWMgY3JlYXRlU3R5bGUob3B0aW9uczogU3R5bGVDcmVhdGVyUGFyYW1zW10pOiBIVE1MRWxlbWVudCB7XHJcblx0XHRcdGNvbnN0IHN0eWxlRWxlbWVudCA9IHRoaXMuI2NyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcblx0XHRcdGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXTtcclxuXHRcdFx0b3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBPYmplY3QuZW50cmllcyhvcHRpb24uc3R5bGUpO1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKC4uLnN0eWxlLm1hcCgoW3Byb3AsIHZhbHVlXSk9PiBgJHtvcHRpb24uc2VsZWN0b3J9eyR7cHJvcH06JHt2YWx1ZX0haW1wb3J0YW50O31gKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gcmVzdWx0LmpvaW4oJ1xcbicpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxuXHRcdH07XHJcblx0XHRwdWJsaWMgY3JlYXRlU2NyaXB0KGZ1bmN0aW9uczogRnVuY3Rpb25bXSk6IEhUTUxFbGVtZW50IHtcclxuXHRcdFx0Y29uc3Qgc2NyaXB0RWxlbWVudCA9IHRoaXMuI2NyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cdFx0XHRjb25zdCByZXN1bHQ6IHN0cmluZ1tdID0gW107XHJcblx0XHRcdHJlc3VsdC5wdXNoKC4uLmZ1bmN0aW9ucy5tYXAodG9TdHJpbmcpKTtcclxuXHRcdFx0c2NyaXB0RWxlbWVudC5pbm5lckhUTUwgPSByZXN1bHQuam9pbignXFxuJyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gc2NyaXB0RWxlbWVudDtcclxuXHRcdH07XHJcblx0fTtcclxuXHRjb25zdCBMYWRkZXJKUyA9IGNsYXNzIExhZGRlckpTIHtcclxuXHRcdCNsaXN0ZW5lcnM6IExpc3RlbmVycyA9IHtcclxuXHRcdFx0aGVhZFN0YXJ0OiBbXSxcclxuXHRcdFx0aGVhZEVuZDogW10sXHJcblx0XHRcdGJvZHlTdGFydDogW10sXHJcblx0XHRcdGJvZHlFbmQ6IFtdXHJcblx0XHR9O1xyXG5cdFxyXG5cdFx0cHVibGljIG9uY2UoZXZlbnROYW1lOiBBbGxFdmVudHMsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG5cdFx0XHRzd2l0Y2goZXZlbnROYW1lKSB7XHJcblx0XHRcdFx0Y2FzZSBTdGFydEV2ZW50cy5IRUFEOiB7XHJcblx0XHRcdFx0XHR0aGlzLiNsaXN0ZW5lcnMuaGVhZFN0YXJ0LnB1c2goY2FsbGJhY2spOyBicmVhaztcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdC8qY2FzZSBFbmRFdmVudHMuSEVBRDoge1xyXG5cdFx0XHRcdFx0dGhpcy5saXN0ZW5lcnMuaGVhZEVuZC5wdXNoKGNhbGxiYWNrKTsgYnJlYWs7XHJcblx0XHRcdFx0fTsqL1xyXG5cdFx0XHRcdGNhc2UgU3RhcnRFdmVudHMuQk9EWToge1xyXG5cdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmJvZHlTdGFydC5wdXNoKGNhbGxiYWNrKTsgYnJlYWs7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRjYXNlIEVuZEV2ZW50cy5CT0RZOiB7XHJcblx0XHRcdFx0XHR0aGlzLiNsaXN0ZW5lcnMuYm9keUVuZC5wdXNoKGNhbGxiYWNrKTsgYnJlYWs7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRkZWZhdWx0OiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYElnbm9yaW5nIGludmFsaWQgZXZlbnQ6IFwiJHtldmVudE5hbWV9XCJgKTsgYnJlYWs7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblx0XHRwdWJsaWMgYXR0YWNoKCk6IHZvaWQge1xyXG5cdFx0XHRjb25zdCBoZWFkTU8gPSAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcblx0XHRcdFx0XHRpZihkb2N1bWVudC5oZWFkKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGxpbmVyID0gbmV3IExpbmVyKGRvY3VtZW50LmhlYWQpO1xyXG5cdFxyXG5cdFx0XHRcdFx0XHQvL3RoaXMuI2xpc3RlbmVycy5oZWFkRW5kLmZvckVhY2goY2FsbD0+IGNhbGwobGluZXIpKTtcclxuXHRcdFx0XHRcdFx0dGhpcy4jbGlzdGVuZXJzLmhlYWRTdGFydC5mb3JFYWNoKGNhbGw9PiBjYWxsKGxpbmVyKSk7XHJcblx0XHRcdFx0XHRcdG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuXHRcdFx0XHRcdFx0Ym9keU1PKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG5cdFx0XHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxyXG5cdFx0XHRcdFx0c3VidHJlZTogdHJ1ZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRjb25zdCBib2R5TU8gPSAoKTogdm9pZCA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcblx0XHRcdFx0XHRpZihkb2N1bWVudC5ib2R5KSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGxpbmVyID0gbmV3IExpbmVyKGRvY3VtZW50LmJvZHkpO1xyXG5cdFxyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKT0+IHRoaXMuI2xpc3RlbmVycy5ib2R5RW5kLmZvckVhY2goY2FsbD0+IGNhbGwobGluZXIpKSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuI2xpc3RlbmVycy5ib2R5U3RhcnQuZm9yRWFjaChjYWxsPT4gY2FsbChsaW5lcikpO1xyXG5cdFx0XHRcdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge1xyXG5cdFx0XHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxyXG5cdFx0XHRcdFx0c3VidHJlZTogdHJ1ZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFxyXG5cdFx0XHRyZXR1cm4gaGVhZE1PKCk7XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRMaW5lcixcclxuXHRcdExhZGRlckpTLFxyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5nbG9iYWxUaGlzLkxhZGRlckpTID0gZXhwb3J0cy5MYWRkZXJKUztcclxuZ2xvYmFsVGhpcy5sYWRkZXIgPSBuZXcgZ2xvYmFsVGhpcy5MYWRkZXJKUygpOyJdLAogICJtYXBwaW5ncyI6ICI7QUFPQSxJQUFNLFdBQVcsTUFBTTtBQUN0QixNQUFNLFFBQVEsTUFBWTtBQUFBLElBRWxCLFlBQW9CLGdCQUFxQztBQUFyQztBQUMxQixXQUFLLGlCQUFpQjtBQUFBLElBQ3ZCO0FBQUEsSUFIQTtBQUFBLElBS0EsZUFBZSxTQUF5QztBQUN2RCxVQUFNLFVBQVUsU0FBUyxjQUFjLE9BQU87QUFDOUMsYUFBTyxPQUFPLE9BQU8sU0FBUztBQUFBLFFBQzdCLFFBQVEsTUFBSyxLQUFLLGVBQWUsWUFBWSxPQUFPO0FBQUEsTUFDckQsQ0FBQztBQUFBLElBQ0Y7QUFBQSxJQUNPLFlBQVksU0FBNEM7QUFDOUQsVUFBTSxlQUFlLEtBQUssZUFBZSxPQUFPLEdBQzFDLFNBQW1CLENBQUM7QUFDMUIscUJBQVEsUUFBUSxZQUFVO0FBQ3pCLFlBQU0sUUFBUSxPQUFPLFFBQVEsT0FBTyxLQUFLO0FBQ3pDLGVBQU8sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQUssR0FBRyxPQUFPLFlBQVksUUFBUSxtQkFBbUIsQ0FBQztBQUFBLE1BQzlGLENBQUMsR0FDRCxhQUFhLFlBQVksT0FBTyxLQUFLO0FBQUEsQ0FBSSxHQUVsQztBQUFBLElBQ1I7QUFBQSxJQUNPLGFBQWEsV0FBb0M7QUFDdkQsVUFBTSxnQkFBZ0IsS0FBSyxlQUFlLFFBQVEsR0FDNUMsU0FBbUIsQ0FBQztBQUMxQixvQkFBTyxLQUFLLEdBQUcsVUFBVSxJQUFJLFFBQVEsQ0FBQyxHQUN0QyxjQUFjLFlBQVksT0FBTyxLQUFLO0FBQUEsQ0FBSSxHQUVuQztBQUFBLElBQ1I7QUFBQSxFQUNEO0FBaUVBLFNBQU87QUFBQSxJQUNOO0FBQUEsSUFDQSxVQWxFZ0IsTUFBZTtBQUFBLE1BQy9CLGFBQXdCO0FBQUEsUUFDdkIsV0FBVyxDQUFDO0FBQUEsUUFDWixTQUFTLENBQUM7QUFBQSxRQUNWLFdBQVcsQ0FBQztBQUFBLFFBQ1osU0FBUyxDQUFDO0FBQUEsTUFDWDtBQUFBLE1BRU8sS0FBSyxXQUFzQixVQUEwQjtBQUMzRCxnQkFBTyxXQUFXO0FBQUEsVUFDakIsS0FBSyxZQUFZLE1BQU07QUFDdEIsaUJBQUssV0FBVyxVQUFVLEtBQUssUUFBUTtBQUFHO0FBQUEsVUFDM0M7QUFBQSxVQUlBLEtBQUssWUFBWSxNQUFNO0FBQ3RCLGlCQUFLLFdBQVcsVUFBVSxLQUFLLFFBQVE7QUFBRztBQUFBLFVBQzNDO0FBQUEsVUFDQSxLQUFLLFVBQVUsTUFBTTtBQUNwQixpQkFBSyxXQUFXLFFBQVEsS0FBSyxRQUFRO0FBQUc7QUFBQSxVQUN6QztBQUFBLFVBQ0EsU0FBUztBQUNSLG9CQUFRLEtBQUssNEJBQTRCLFlBQVk7QUFBRztBQUFBLFVBQ3pEO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNPLFNBQWU7QUFDckIsWUFBTSxTQUFTLE1BQVk7QUFDMUIsY0FBTSxXQUFXLElBQUksaUJBQWlCLE1BQU07QUFDM0MsZ0JBQUcsU0FBUyxNQUFNO0FBQ2pCLGtCQUFNLFFBQVEsSUFBSSxNQUFNLFNBQVMsSUFBSTtBQUdyQyxtQkFBSyxXQUFXLFVBQVUsUUFBUSxVQUFPLEtBQUssS0FBSyxDQUFDLEdBQ3BELFNBQVMsV0FBVyxHQUNwQixPQUFPO0FBQUE7QUFBQSxVQUVULENBQUM7QUFDRCxtQkFBUyxRQUFRLFVBQVU7QUFBQSxZQUMxQixXQUFXO0FBQUEsWUFDWCxTQUFTO0FBQUEsVUFDVixDQUFDO0FBQUEsUUFDRixHQUNNLFNBQVMsTUFBWTtBQUMxQixjQUFNLFdBQVcsSUFBSSxpQkFBaUIsTUFBTTtBQUMzQyxnQkFBRyxTQUFTLE1BQU07QUFDakIsa0JBQU0sUUFBUSxJQUFJLE1BQU0sU0FBUyxJQUFJO0FBRXJDLHVCQUFTLGlCQUFpQixvQkFBb0IsTUFBSyxLQUFLLFdBQVcsUUFBUSxRQUFRLFVBQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUN0RyxLQUFLLFdBQVcsVUFBVSxRQUFRLFVBQU8sS0FBSyxLQUFLLENBQUMsR0FDcEQsU0FBUyxXQUFXO0FBQUE7QUFBQSxVQUV0QixDQUFDO0FBQ0QsbUJBQVMsUUFBUSxVQUFVO0FBQUEsWUFDMUIsV0FBVztBQUFBLFlBQ1gsU0FBUztBQUFBLFVBQ1YsQ0FBQztBQUFBLFFBQ0Y7QUFFQSxlQUFPLE9BQU87QUFBQSxNQUNmO0FBQUEsSUFDRDtBQUFBLEVBS0E7QUFDRCxHQUFHO0FBRUgsV0FBVyxXQUFXLFFBQVE7QUFDOUIsV0FBVyxTQUFTLElBQUksV0FBVyxTQUFTOyIsCiAgIm5hbWVzIjogW10KfQo=
