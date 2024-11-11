const source = document.getElementById("searchbar");
const p = document.getElementById("temp");
let shortcuts = null;

fetch(window.jsonUri).then(response => {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
}).then(data => {
  shortcuts = data;
}).catch(err => console.log('Fetch error:', err));

const inputHandler = function(e) {
  // p.innerText = e.target.value;
  p.innerText = "";
  list = document.getElementById("myList");
  list.innerHTML = null;
  shortcuts.forEach(element => {
    item = document.createElement("li");
    item.innerText = Object.entries(element)[0][0] + " : " + Object.entries(element)[0][1];
    list.appendChild(item);
  });
};

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange',inputHandler);
