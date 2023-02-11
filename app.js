const inputEl = document.getElementById("input-el");
const saveButton = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el");
let savedUrl = [];
const deleteButton = document.getElementById("delete-btn");
const urlFromLocalStorage = JSON.parse(localStorage.getItem("savedUrl"));
const tabBtn = document.getElementById("tab-btn");

if (urlFromLocalStorage) {
  savedUrl = urlFromLocalStorage;
  render(savedUrl);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    savedUrl.push(tabs[0].url);
    localStorage.setItem("savedUrl", JSON.stringify(savedUrl));
    render(savedUrl);
  });
});

function render(url) {
  let listItems = "";
  for (let i = 0; i < url.length; i++) {
    listItems += `
      <li>
        <a href="${url[i]}" target="_blank">
        ${url[i]}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

deleteButton.addEventListener("dblclick", function () {
  localStorage.clear();
  savedUrl = [];
  render(savedUrl);
});

saveButton.addEventListener("click", function () {
  savedUrl.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("savedUrl", JSON.stringify(savedUrl));
  render(savedUrl);
});

