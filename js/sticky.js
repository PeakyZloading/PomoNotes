const stickyButton = document.getElementById('stickyButtons');

stickyButton.addEventListener("click", function() {
    const stickyNote = document.createElement('div');
    stickyNote.style.width = '300px';
    stickyNote.style.height = '300px';
    stickyNote.style.backgroundColor = 'yellow';
    stickyNote.draggable = 'true';

    stickyNote.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'Drag me!');
    });

    //stickyNote.addEventListener("dragend", )

    stickyNote.addEventListener("dragend", (e) => {
        // Add any code you want to run when the sticky note is dragged and released here.
        // For example, you can log its final position or perform some other action.
        console.log("Sticky note dragged and released");
    });




    document.body.appendChild(stickyNote);
});