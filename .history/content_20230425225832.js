var note = document.createElement('div');
note.style.position = 'fixed';
note.style.top = '50px';
note.style.left = '50px';
note.style.backgroundColor = 'yellow';
note.style.padding = '10px';
note.style.border = '1px solid black';
note.style.zIndex = '999999';

var noteContent = document.createElement('textarea');
noteContent.style.width = '100%';
noteContent.style.height = '100%';
note.appendChild(noteContent);

document.body.appendChild(note);

var notePosition = { top: 50, left: 50 };

chrome.storage.sync.get('notePosition', function(data) {
  if (data.notePosition) {
    notePosition = data.notePosition;
    note.style.top = notePosition.top + 'px';
    note.style.left = notePosition.left + 'px';
  }
});

var mouseDown = false;
var offsetX = 0;
var offsetY = 0;

note.addEventListener('mousedown', function(event) {
  mouseDown = true;
  offsetX = event.offsetX;
  offsetY = event.offsetY;
});

note.addEventListener('mouseup', function(event) {
  mouseDown = false;
});

document.addEventListener('mousemove', function(event) {
  if (mouseDown) {
    var x = event.clientX - offsetX;
    var y = event.clientY - offsetY;
    note.style.top = y + 'px';
    note.style.left = x + 'px';

    chrome.runtime.onMessage.emit({ type: 'noteMoved', position: { top: y, left: x } });
}
});
