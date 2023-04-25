var noteInput = document.getElementById('note');
var saveButton = document.getElementById('save');

chrome.storage.sync.get('noteContent', function(data) {
  if (data.noteContent) {
    noteInput.value = data.noteContent;
  }
});

saveButton.addEventListener('click', function() {
  chrome.storage.sync.set({ noteContent: noteInput.value });
  window.close();
});
