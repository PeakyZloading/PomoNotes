const stickyNoteElement = document.getElementById('stickyNoteButton');

//Track the currently dragged sticky note
let currentStickyNote; 

stickyNoteElement.addEventListener('click', function () {

  //Creates the structure for the sticky notes
  const stickyNoteBox = document.createElement('div');
  stickyNoteBox.style.height = '200px';
  stickyNoteBox.style.width = '200px';
  stickyNoteBox.style.backgroundColor = 'yellow';
  stickyNoteBox.style.position = 'absolute'; // Make it positioned
  stickyNoteBox.style.cursor = 'move'; // Set cursor style to indicate draggability

  //Sets up editable text for sticky note
  const editableContent = document.createElement('div');
  editableContent.style.width = '180px';
  editableContent.style.height = '180px';
  editableContent.style.border = 'none';
  editableContent.style.padding = '10px';
  editableContent.style.overflow = 'auto';
  editableContent.setAttribute('contentEditable', 'true');
  editableContent.textContent = 'Write your note here...';
  stickyNoteBox.appendChild(editableContent);

  document.body.appendChild(stickyNoteBox);

  //Make the sticky note draggable
  stickyNoteBox.setAttribute('draggable', 'true');

  // Event listener for drag start
  stickyNoteBox.addEventListener('dragstart', (e) => {
    currentStickyNote = stickyNoteBox;
  });
});

//Event listener for drag over (to allow dropping anywhere)
document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

//Event listener for drop
document.addEventListener('drop', (e) => {
  e.preventDefault();
  if (currentStickyNote) {
    const x = e.clientX - currentStickyNote.clientWidth / 2;
    const y = e.clientY - currentStickyNote.clientHeight / 2;
    
    //Move the currently dragged sticky note to the drop location
    currentStickyNote.style.left = x + 'px';
    currentStickyNote.style.top = y + 'px';
    //Reset the currently dragged sticky note
    currentStickyNote = null;
  }
});
