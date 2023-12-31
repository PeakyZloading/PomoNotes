//Gets both elements and assigns them to variable
const timeElement = document.getElementById('current-time');
const editableDiv = document.getElementById('editableName');


//Keeps track of mouse hovering
let hovering = false;
// Function to update the time
function updateTime() {
    const currentDate = new Date();
    let hours = currentDate.getHours(), minutes = currentDate.getMinutes(), seconds = currentDate.getSeconds();
    let am_pm = "AM";

    //Updates time for 12hr standard and AM/PM
    if (hours > 12) {
      hours -= 12;
      am_pm = "PM";
    }
    else if(hours == 12){
      am_pm = "PM";
    }
    else if(hours == 0){
      hours = 12;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    //Check if hovering, and display seconds accordingly
    if (hovering) {
      timeElement.innerText = hours + ":" + minutes + ":" + seconds + " " + am_pm;
    } else {
      timeElement.innerText = hours + ":" + minutes + " " + am_pm;
    }
}
//Updates time initially
updateTime();

//Updates time every second
setInterval(updateTime, 1000);
//Displays name from local storage and saves it
function displayEditedName() {
  chrome.storage.local.get('editedName', function (data) {
      const editedName = data.editedName;
      if (editedName) {
          editableDiv.textContent = editedName;
      }
  });
}

// Initialize the display of the edited name
displayEditedName();

//Event listener to detect mouse hovering
timeElement.addEventListener('mouseenter', function () {
  hovering = true;
  updateTime(); 
});

//Event listener to detect mouse hovering stopping
timeElement.addEventListener('mouseleave', function () {
  hovering = false;
  updateTime();
});

//Event listener to detect mouse double clicks
editableDiv.addEventListener("dblclick", function () {
  this.contentEditable = true;
  this.focus();
});

//Event listener for blur event in editing the name
editableDiv.addEventListener("blur", function () {
  this.contentEditable = false;
  const editedName = this.textContent;
  chrome.storage.local.set({ 'editedName': editedName }, function() {
  });
});

