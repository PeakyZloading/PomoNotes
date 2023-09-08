const randQuote = document.getElementById('randomQuote');
const randomQuoteButton = document.getElementById('randomQuoteButton');

const myRequest = new Request("https://api.quotable.io/random");


apiFetch();

randomQuoteButton.addEventListener("click", apiFetch);

function apiFetch(){

  fetch(myRequest)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    randQuote.textContent = data.content;
  });
}

