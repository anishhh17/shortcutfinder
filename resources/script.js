const source = document.getElementById("search-bar");
const p = document.getElementById("temp");
const shortcutCardTemplate = document.getElementById("data-shortcut-template");
let shortcuts = [];
source.focus();
fetch(window.jsonUri).then(response => {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
}).then(data => {
  shortcuts = data.map(element => {
    const card = shortcutCardTemplate.content.cloneNode(true).children[0];
    const header = card.querySelector("[data-header]");
    const body = card.querySelector("[data-body]");

    header.textContent = Object.keys(element)[0];
    Object.values(element)[0].forEach( i => {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(i));
      body.appendChild(li);
    });

    document.querySelector(".search-items").appendChild(card);
    return {task: Object.keys(element)[0].toLowerCase(), shortcut: Object.values(element)[0], element: card};
  });
}).catch(err => console.log('Fetch error:', err));

source.addEventListener('input', e => {
  const value = e.target.value.toLowerCase();
  shortcuts.forEach( element => {
    const isVisible = element.task.includes(value);
    console.log(isVisible);
    element.element.classList.toggle("hide", !isVisible);
  });
});