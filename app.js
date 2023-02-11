// This code is used to save and render URLs in a web page.
const inputEl = document.getElementById("input-el"); // Get the element with the id "input-el" and assign it to the variable inputEl
const saveButton = document.getElementById("save-btn"); // Get the element with the id "save-btn" and assign it to the variable saveButton
const ulEl = document.getElementById("ul-el"); // Get the element with the id "ul-el" and assign it to the variable ulEl
let savedUrl = []; // Create an empty array called savedUrl
const deleteButton = document.getElementById("delete-btn"); // Get the element with the id "delete-btn" and assign it to the variable deleteButton
const urlFromLocalStorage = JSON.parse(localStorage.getItem("savedUrl")); // Parse any saved URLs from local storage and assign them to urlFromLocalStorage
const tabBtn = document.getElementById("tab-btn"); // Get the element with the id "tab-btn" and assign it to tabBtn

if (urlFromLocalStorage) {
  // If there are any URLs stored in local storage,
  savedUrl = urlFromLocalStorage; // Assign them to savedUrl
  render(savedUrl); // And render them on screen
}

tabBtn.addEventListener("click", function () {
  // When tabBtn is clicked,
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Query Chrome tabs for active tabs in current window,
    savedUrl.push(tabs[0].url); // Push first URL found into savedURL array,
    localStorage.setItem("savedUrl", JSON.stringify(savedUrl)); // Save updated array of URLs into local storage,
    render(savedUrl); // And render them on screen
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

// This code adds an event listener to the deleteButton element, which will clear the localStorage and savedUrl array when double clicked.
deleteButton.addEventListener("dblclick", function () {
  // Clear the localStorage
  localStorage.clear();
  // Clear the savedUrl array
  savedUrl = [];
  // Render the updated savedUrl array
  render(savedUrl);
});

// This code adds an event listener to the saveButton element, which will add a new item to the savedUrl array and update localStorage when clicked.
saveButton.addEventListener("click", function () {
  // Push the value of inputEl into the savedUrl array
  savedUrl.push(inputEl.value);
  // Clear inputEl's value after pushing it into the array
  inputEl.value = "";
  // Update localStorage with new item in savedUrl array
  localStorage.setItem("savedUrl", JSON.stringify(savedUrl));
  // Render updated savedUrl array
  render(savedUrl);
});

