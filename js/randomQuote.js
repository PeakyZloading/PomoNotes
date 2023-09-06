const randQuote = document.getElementById('randomQuote');

const myRequest = new Request("https://api.quotable.io/random");

fetch(myRequest)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log(data.content);
    randQuote.textContent = data.content;
  });

