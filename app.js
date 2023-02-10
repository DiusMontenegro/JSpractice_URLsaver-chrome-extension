const inputEl = document.getElementById("input-el");
const saveButton = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el");
let savedUrl = [];
let urlFromLocalStorage = JSON.parse(localStorage.getItem("savedUrl"));

if (urlFromLocalStorage) {
  savedUrl = urlFromLocalStorage;
  render()
}

saveButton.addEventListener("click", function () {
  savedUrl.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("savedUrl", JSON.stringify(savedUrl));
  render();
  console.log(localStorage.getItem("savedUrl"))
});

function render() {
  let listItems = "";
  for (let i = 0; i < savedUrl.length; i++) {
    listItems += `
      <li>
        <a href="${savedUrl[i]}" target="_blank">
        ${savedUrl[i]}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

