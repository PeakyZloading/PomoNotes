document.addEventListener("DOMContentLoaded", function () {
    const myImage = document.getElementById("myImage");
    const imageUrl = "https://source.unsplash.com/random/1920x1080/?modern";
    const myRequest = new Request(imageUrl);
  
    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        return response.blob();
      })
      .then((response) => {
        myImage.src = URL.createObjectURL(response);
      });
  });
  