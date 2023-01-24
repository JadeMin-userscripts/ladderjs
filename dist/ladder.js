// src/index.ts
window.Ladder = class {
  listeners = {
    startHead: [],
    endHead: [],
    startBody: [],
    endBody: []
  };
  once(eventName, callback) {
    switch (eventName) {
      case "startHead" /* head */: {
        this.listeners.startHead.push(callback);
        break;
      }
      case "endHead" /* head */: {
        this.listeners.startHead.push(callback);
        break;
      }
      case "startBody" /* body */: {
        this.listeners.startBody.push(callback);
        break;
      }
      case "endBody" /* body */: {
        this.listeners.endBody.push(callback);
        break;
      }
      default:
        console.warn(`Ignoring invalid event: "${eventName}"`);
    }
  }
  setup() {
    let headMO = new MutationObserver(() => {
      document.head && (this.listeners.startHead.forEach((c) => c()), headMO.disconnect());
    }), bodyMO = new MutationObserver(() => {
      document.body && (document.addEventListener("DOMContentLoaded", () => this.listeners.endBody.forEach((c) => c())), this.listeners.startBody.forEach((c) => c()), bodyMO.disconnect());
    });
    headMO.observe(document, { childList: !0, subtree: !0 }), bodyMO.observe(document, { childList: !0, subtree: !0 });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xyXG5cdExpc3RlbmVycywgT25jZUNhbGxiYWNrLFxyXG5cdFN0YXJ0RXZlbnRzLCBFbmRFdmVudHMsXHJcbn0gZnJvbSBcIi4vdHlwZXMuanNcIjtcclxuXHJcblxyXG53aW5kb3cuTGFkZGVyID0gY2xhc3MgTGFkZGVySlMge1xyXG5cdHByaXZhdGUgbGlzdGVuZXJzOiBMaXN0ZW5lcnMgPSB7XHJcblx0XHRzdGFydEhlYWQ6IFtdLFxyXG5cdFx0ZW5kSGVhZDogW10sXHJcblx0XHRzdGFydEJvZHk6IFtdLFxyXG5cdFx0ZW5kQm9keTogW11cclxuXHR9O1xyXG5cclxuXHRwdWJsaWMgb25jZShldmVudE5hbWU6IFN0YXJ0RXZlbnRzfEVuZEV2ZW50cywgY2FsbGJhY2s6IE9uY2VDYWxsYmFjayk6IHZvaWQge1xyXG5cdFx0c3dpdGNoKGV2ZW50TmFtZSkge1xyXG5cdFx0XHRjYXNlIFN0YXJ0RXZlbnRzLmhlYWQ6IHtcclxuXHRcdFx0XHR0aGlzLmxpc3RlbmVycy5zdGFydEhlYWQucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRjYXNlIEVuZEV2ZW50cy5oZWFkOiB7XHJcblx0XHRcdFx0dGhpcy5saXN0ZW5lcnMuc3RhcnRIZWFkLnB1c2goY2FsbGJhY2spOyBicmVhaztcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2FzZSBTdGFydEV2ZW50cy5ib2R5OiB7XHJcblx0XHRcdFx0dGhpcy5saXN0ZW5lcnMuc3RhcnRCb2R5LnB1c2goY2FsbGJhY2spOyBicmVhaztcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2FzZSBFbmRFdmVudHMuYm9keToge1xyXG5cdFx0XHRcdHRoaXMubGlzdGVuZXJzLmVuZEJvZHkucHVzaChjYWxsYmFjayk7IGJyZWFrO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRkZWZhdWx0OiB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKGBJZ25vcmluZyBpbnZhbGlkIGV2ZW50OiBcIiR7ZXZlbnROYW1lfVwiYCk7XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdH07XHJcblx0cHVibGljIHNldHVwKCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgaGVhZE1POiBNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG5cdFx0XHRpZiAoZG9jdW1lbnQuaGVhZCkge1xyXG5cdFx0XHRcdC8vdGhpcy4jbGlzdGVuZXJzLm9uY2UuZW5kSGVhZC5mb3JFYWNoKGM9PmMoKSk7XHJcblx0XHRcdFx0dGhpcy5saXN0ZW5lcnMuc3RhcnRIZWFkLmZvckVhY2goYz0+YygpKTtcclxuXHRcdFx0XHRoZWFkTU8uZGlzY29ubmVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IGJvZHlNTzogTXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuXHRcdFx0aWYgKGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB0aGlzLmxpc3RlbmVycy5lbmRCb2R5LmZvckVhY2goYz0+YygpKSk7XHJcblxyXG5cdFx0XHRcdHRoaXMubGlzdGVuZXJzLnN0YXJ0Qm9keS5mb3JFYWNoKGM9PmMoKSk7XHJcblx0XHRcdFx0Ym9keU1PLmRpc2Nvbm5lY3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRoZWFkTU8ub2JzZXJ2ZShkb2N1bWVudCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XHJcblx0XHRib2R5TU8ub2JzZXJ2ZShkb2N1bWVudCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XHJcblx0fTtcclxufTsiXSwKICAibWFwcGluZ3MiOiAiO0FBTUEsT0FBTyxTQUFTLE1BQWU7QUFBQSxFQUN0QixZQUF1QjtBQUFBLElBQzlCLFdBQVcsQ0FBQztBQUFBLElBQ1osU0FBUyxDQUFDO0FBQUEsSUFDVixXQUFXLENBQUM7QUFBQSxJQUNaLFNBQVMsQ0FBQztBQUFBLEVBQ1g7QUFBQSxFQUVPLEtBQUssV0FBa0MsVUFBOEI7QUFDM0UsWUFBTyxXQUFXO0FBQUEsTUFDakIsNkJBQXVCO0FBQ3RCLGFBQUssVUFBVSxVQUFVLEtBQUssUUFBUTtBQUFHO0FBQUEsTUFDMUM7QUFBQSxNQUNBLDJCQUFxQjtBQUNwQixhQUFLLFVBQVUsVUFBVSxLQUFLLFFBQVE7QUFBRztBQUFBLE1BQzFDO0FBQUEsTUFDQSw2QkFBdUI7QUFDdEIsYUFBSyxVQUFVLFVBQVUsS0FBSyxRQUFRO0FBQUc7QUFBQSxNQUMxQztBQUFBLE1BQ0EsMkJBQXFCO0FBQ3BCLGFBQUssVUFBVSxRQUFRLEtBQUssUUFBUTtBQUFHO0FBQUEsTUFDeEM7QUFBQSxNQUNBO0FBQ0MsZ0JBQVEsS0FBSyw0QkFBNEIsWUFBWTtBQUFBLElBRXZEO0FBQUEsRUFDRDtBQUFBLEVBQ08sUUFBYztBQUNwQixRQUFNLFNBQTJCLElBQUksaUJBQWlCLE1BQU07QUFDM0QsTUFBSSxTQUFTLFNBRVosS0FBSyxVQUFVLFVBQVUsUUFBUSxPQUFHLEVBQUUsQ0FBQyxHQUN2QyxPQUFPLFdBQVc7QUFBQSxJQUVwQixDQUFDLEdBQ0ssU0FBMkIsSUFBSSxpQkFBaUIsTUFBTTtBQUMzRCxNQUFJLFNBQVMsU0FDWixTQUFTLGlCQUFpQixvQkFBb0IsTUFBTSxLQUFLLFVBQVUsUUFBUSxRQUFRLE9BQUcsRUFBRSxDQUFDLENBQUMsR0FFMUYsS0FBSyxVQUFVLFVBQVUsUUFBUSxPQUFHLEVBQUUsQ0FBQyxHQUN2QyxPQUFPLFdBQVc7QUFBQSxJQUVwQixDQUFDO0FBQ0QsV0FBTyxRQUFRLFVBQVUsRUFBRSxXQUFXLElBQU0sU0FBUyxHQUFLLENBQUMsR0FDM0QsT0FBTyxRQUFRLFVBQVUsRUFBRSxXQUFXLElBQU0sU0FBUyxHQUFLLENBQUM7QUFBQSxFQUM1RDtBQUNEOyIsCiAgIm5hbWVzIjogW10KfQo=
