const timeElement = document.getElementById('current-time');
const editableDiv = document.getElementById('editableName');


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

//Event listeners to detect mouse hovering
timeElement.addEventListener('mouseenter', function () {
  hovering = true;
  updateTime(); 
});

timeElement.addEventListener('mouseleave', function () {
  hovering = false;
  updateTime();
});


editableDiv.addEventListener("dblclick", function () {
  this.contentEditable = true;
  this.focus();
});

editableDiv.addEventListener("blur", function () {
  this.contentEditable = false;
  // Store or process the edited content as needed
  const editedContent = this.innerHTML;
});
