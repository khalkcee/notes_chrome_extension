chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'noteMoved') {
    chrome.storage.sync.set({ notePosition: request.position });
  }
});
