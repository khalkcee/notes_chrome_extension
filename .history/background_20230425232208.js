chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ notePosition: { top: 0, left: 0 } });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'noteMoved') {
    chrome.storage.sync.set({ notePosition: message.position });
  }
});

chrome.scripting.registerServiceWorker({
  url: chrome.runtime.getURL('background.js')
});
