const source = document.getElementById("searchbar");
const p = document.getElementById("temp");

const inputHandler = function(e) {
  p.innerText = e.target.value;
};

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange',inputHandler);