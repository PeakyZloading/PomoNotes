const timeElement = document.getElementById('current-time');
const editableDiv = document.getElementById('editableName');
const pomoElement = document.getElementById('pomoButton');
const pomoContainer = document.getElementById('pomoContainer');


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
  const editedName = this.textContent;
  chrome.storage.local.set({ 'editedName': editedName }, function() {
  });
});


// Listener for clicking the pomodoro button in menu
pomoElement.addEventListener("click", function(){
  const box = document.createElement('div');
  
  //Box dimensions
  box.style.width = '300px';
  box.style.height = '150px';
  box.style.backgroundColor = 'blue';
  box.style.margin = '10px';
  box.style.textAlign = 'center';


  const buttonContainerTop = document.createElement('div');
  const buttonContainerBottom = document.createElement('div');

  //Arrange buttons
  buttonContainerTop.style.display = 'flex';
  buttonContainerTop.style.flexDirection = 'row';
  buttonContainerTop.style.paddingTop = '15px';

  //Creates buttons
  const pomoButton = document.createElement('button');
  const shortButton = document.createElement('button');
  const longButton = document.createElement('button');
  const startButton = document.createElement('button');
  const restartButton = document.createElement('button');


  pomoButton.textContent = 'Pomodoro';
  shortButton.textContent = 'Short Break';
  longButton.textContent = 'Long Break';
  startButton.textContent = 'Start/Pause';
  restartButton.textContent = 'Restart';

  // Style the buttons
  pomoButton.classList.add('my-button'); 
  shortButton.classList.add('my-button'); 
  longButton.classList.add('my-button'); 


  pomoButton.style.marginRight = '10px';
  shortButton.style.marginRight = '10px';
  startButton.style.marginRight = '10px';

  // Append the buttons to the button container
  buttonContainerTop.appendChild(pomoButton);
  buttonContainerTop.appendChild(shortButton);
  buttonContainerTop.appendChild(longButton);

  buttonContainerBottom.appendChild(startButton);
  buttonContainerBottom.appendChild(restartButton);

  //Position the button container at the top of box
  buttonContainerTop.style.position = 'absolute';
  buttonContainerTop.style.top = '5px';
  buttonContainerTop.style.right = '26px';

  //Position the button container at the bottom of the box
  buttonContainerBottom.style.position = 'absolute';
  buttonContainerBottom.style.top = '125px';
  buttonContainerBottom.style.right = '85px';


  //Add everything into the container
  pomoContainer.appendChild(box);
  pomoContainer.appendChild(buttonContainerTop);
  pomoContainer.appendChild(buttonContainerBottom);

  let timerInterval;
  let timerRunning = false;
  let timerValue = 0; 

  //Updates timer display
  function updateTimer() {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    let displaySeconds;
  
    if (seconds < 10) {
      displaySeconds = '0' + seconds;
    } else {
      displaySeconds = seconds.toString();
    }
    //Styles the timer text and displays the string
    box.innerHTML = `<span style="color: red; font-size: 55px; position: relative; top: 40px; left: 0;">${minutes}:${displaySeconds}</span>`;
  }
  

  //Listener for clicking the Start/Pause button
  startButton.addEventListener("click", function(){
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
    } 
    else {
      timerInterval = setInterval(function() {
        if (timerValue > 0) {
          timerValue--;
          updateTimer();
        }
        else {
          clearInterval(timerInterval);
          timerRunning = false;
        }
      }, 1000);
      timerRunning = true;
    }
  });

  //Listener for clicking the Restart button
  restartButton.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerValue = 25 * 60;
    updateTimer();
  });

  //Listener for clicking the Pomodoro button
  pomoButton.addEventListener("click", function(){
    timerValue = 25 * 60;
    updateTimer();
  });

  //Listener for clicking the Short Break button
  shortButton.addEventListener("click", function(){
    timerValue = 5 * 60;
    updateTimer();
  });

  //Listener for clicking the Long Break button
  longButton.addEventListener("click", function(){
    timerValue = 10 * 60;
    updateTimer();
  });

  //Initializes timer
  updateTimer();
});

