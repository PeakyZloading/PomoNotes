const pomoElement = document.getElementById('pomoButton');
const pomoContainer = document.getElementById('pomoContainer');

// Listener for clicking the pomodoro button in menu
pomoElement.addEventListener("click", function(){
    const box = document.createElement('div');
    box.classList.add('pomoBox');
  
    const buttonContainerTop = document.createElement('div');
    const buttonContainerBottom = document.createElement('div');
    buttonContainerTop.classList.add('buttonContainerTop'); 
    buttonContainerBottom.classList.add('buttonContainerBottom'); 
  
  
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
  
    //Style the buttons
    pomoButton.classList.add('pomoButtons'); 
    shortButton.classList.add('pomoButtons'); 
    longButton.classList.add('pomoButtons');
    startButton.classList.add('pomoButtons');
    restartButton.classList.add('pomoButtons');
  
  
    pomoButton.style.marginRight = '10px';
    shortButton.style.marginRight = '10px';
    startButton.style.marginRight = '10px';
  
    //Append the buttons to the button container
    buttonContainerTop.appendChild(pomoButton);
    buttonContainerTop.appendChild(shortButton);
    buttonContainerTop.appendChild(longButton);
  
    buttonContainerBottom.appendChild(startButton);
    buttonContainerBottom.appendChild(restartButton);
  
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
    
    //Listeners for all of the buttons in the timer
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
  
    restartButton.addEventListener("click", function() {
      clearInterval(timerInterval);
      timerRunning = false;
      timerValue = 25 * 60;
      updateTimer();
    });
  
    pomoButton.addEventListener("click", function(){
      timerValue = 25 * 60;
      updateTimer();
    });
  
    shortButton.addEventListener("click", function(){
      timerValue = 5 * 60;
      updateTimer();
    });
  
    longButton.addEventListener("click", function(){
      timerValue = 10 * 60;
      updateTimer();
    });

    //Initializes timer
    updateTimer();
    //FIX LATER Ensures the menu button only spawns the timer once FIX LATER
  },{once : true});