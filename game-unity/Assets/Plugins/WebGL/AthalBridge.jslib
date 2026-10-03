mergeInto(LibraryManager.library, {
  AthalGameEvent: function(typePtr, payloadPtr) {
    var type = UTF8ToString(typePtr);
    var payloadText = UTF8ToString(payloadPtr);
    var payload = {};
    try { payload = JSON.parse(payloadText || "{}"); } catch (_) {}

    window.dispatchEvent(new CustomEvent("athal-game", {
      detail: { type: type, payload: payload }
    }));

    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        source: "athal-unity",
        type: type,
        payload: payload
      }, window.location.origin);
    }
  }
});
