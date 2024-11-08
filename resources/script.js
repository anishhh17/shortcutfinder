const source = document.getElementById("searchbar");
const p = document.getElementById("temp");
let shortcuts = null;
const inputHandler = function(e) {
  p.innerText = e.target.value;
};

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange',inputHandler);

fetch(window.jsonUri).then(response => {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
}).then(data => {
  shortcuts = data;
  console.log(shortcuts[0]);
}).catch(err => console.log('Fetch error:', err));