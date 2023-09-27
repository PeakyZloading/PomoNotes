const stickyNoteElement = document.getElementById('stickyNoteButton');

let currentStickyNote; // Track the currently dragged sticky note

stickyNoteElement.addEventListener('click', function () {
  // Creates the structure for the sticky notes
  const stickyNoteBox = document.createElement('div');
  stickyNoteBox.style.width = '200px';
  stickyNoteBox.style.backgroundColor = 'yellow';
  stickyNoteBox.style.position = 'absolute'; // Make it positioned
  stickyNoteBox.style.cursor = 'move'; // Set cursor style to indicate draggability

  // Create the top part for the delete button
  const topPart = document.createElement('div');
  topPart.style.height = '20px'; // Height for the top part
  topPart.style.backgroundColor = 'red'; // Background color for the top part

  //Create the delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'X';
  deleteButton.style.cursor = 'pointer';
  deleteButton.style.backgroundColor = 'transparent';
  deleteButton.style.border = 'none';
  deleteButton.style.fontSize = '14px';
  deleteButton.style.color = 'white';

  //Position the delete button in the top part
  deleteButton.style.position = 'absolute';
  deleteButton.style.top = '2px';
  deleteButton.style.right = '5px';

  deleteButton.addEventListener('click', () => {
    //Removes the sticky note
    document.body.removeChild(stickyNoteBox);
  });

  //Create the bottom part for the editable content
  const bottomPart = document.createElement('div');
  bottomPart.style.padding = '10px';
  bottomPart.style.overflow = 'auto';
  bottomPart.style.height = '150px'; 
  bottomPart.style.borderTop = '1px solid black';

  //Sets up editable text for sticky note
  const editableContent = document.createElement('div');
  editableContent.style.width = '100%';
  editableContent.style.height = '100%';
  editableContent.style.border = 'none';
  editableContent.style.overflow = 'auto';
  editableContent.style.outline = 'none';
  editableContent.setAttribute('contentEditable', 'true');
  editableContent.textContent = 'Write your note here...';

  //Append the delete button to the top part
  topPart.appendChild(deleteButton);

  //Append the top and bottom parts to the sticky note
  stickyNoteBox.appendChild(topPart);
  stickyNoteBox.appendChild(bottomPart);
  
  //Append the editable content to the bottom part
  bottomPart.appendChild(editableContent);

  document.body.appendChild(stickyNoteBox);

  //Make the sticky note draggable
  stickyNoteBox.setAttribute('draggable', 'true');

  // Event listener for drag start
  stickyNoteBox.addEventListener('dragstart', (e) => {
    //Track the currently dragged sticky note
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
