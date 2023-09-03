function updateCurrentTime() {
    const element = document.getElementById('current-time');
    setInterval(function () {
      const currentDate = new Date();
      let hours = currentDate.getHours()
      let minutes = currentDate.getMinutes();
      if(hours > 12){
        hours -= 12;
      }
      if(minutes < 10){
        minutes = '0' + minutes;
      }
      element.innerText = hours + ":" + minutes;
    }, 1000);
  }

updateCurrentTime();