function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service worker registration failed:', error);
      });
  } else {
    console.log('Service workers are not supported.');
  }
}

registerServiceWorker();



chrome.runtime.onInstalled.addListener(function () {
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
