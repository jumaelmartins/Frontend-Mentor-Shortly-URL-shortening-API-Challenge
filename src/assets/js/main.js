import "../styles/main.scss";
import { shorteningLink, shorteningLinkToHtml } from "./shortening-api";

const input = document.querySelector("input");
const form = document.querySelector("form");
const shortenLinkToRender = document.querySelector(".shortenLink");
const warning = document.querySelector("label");
const range = document.createRange();
let itemsToLocalStorage = [];
const menuButton = document.querySelector(".menuButton");
const menuItems = document.querySelectorAll(".toggle");
const menuContainer = document.querySelector("nav");

menuButton.addEventListener("click", (e) => {
  menuItems.forEach((item) => {
    item.classList.toggle("toggle");
  });
  menuContainer.classList.toggle("white");
});

const loadLocalStorageItem = async (item) => {
  item.innerHTML = "";

  if (localStorage.itemToStorage) {
    itemsToLocalStorage = JSON.parse(localStorage.getItem("itemToStorage"));
  }
  for (let localItem in itemsToLocalStorage) {
    const li = itemsToLocalStorage[localItem].html;
    item.innerHTML += li;
  }
  deleteItemLocalStorage(shortenLinkToRender);
};

const addItemToLocalStorage = async (html) => {
  if (localStorage.itemToStorage) {
    itemsToLocalStorage = JSON.parse(localStorage.getItem("itemToStorage"));
  }
  const id = Math.floor(Math.random() * 1000);
  const ul = document.createElement("ul");
  ul.innerHTML = await html;
  const li = ul.querySelector(":first-child");
  
  li.classList.add(`${id}`);
  const obj = {
    html: li.outerHTML,
    id: id,
  };
  itemsToLocalStorage.push(obj);
  localStorage.itemToStorage = JSON.stringify(itemsToLocalStorage);
};

const deleteItemLocalStorage = async (li) => {
  if (localStorage.itemToStorage) {
    itemsToLocalStorage = JSON.parse(localStorage.getItem("itemToStorage"));
  }
  await li;
  let deleteButton = document.querySelectorAll(".trash");

  deleteButton = Array.from(deleteButton);

  let id = 0;
  deleteButton.forEach((item) => {
    item.addEventListener("click", (e) => {
      const value = e.target.closest("li").classList.value;
      id = value;
      newArray.forEach((item) => {
        if (item.id === parseInt(id)) {
          array2 = array2.filter((link) => {
            return link !== item;
          });

          itemsToLocalStorage = [];
          localStorage.itemToStorage = JSON.stringify(array2);
        }
      });
    });
  });

  const newArray = Array.from(itemsToLocalStorage);
  let array2 = [...newArray];
};

/* STOP */

const shorteningLinkByClick = async () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = input.value;
    const validation = await formValidate(url);

    if (validation) {
      const shortenUrlHtml = await shorteningLinkToHtml(url);
      shortenLinkToRender.innerHTML += shortenUrlHtml;
      addItemToLocalStorage(shortenUrlHtml);
    }
  });
};

const formValidate = async (value) => {
  if ((await shorteningLink(value)) === false || !value) {
    input.classList.add("warning");
    warning.classList.remove("hidden");

    return false;
  } else if (value) {
    input.classList.remove("warning");
    warning.classList.add("hidden");
    return true;
  }
};

const copyLink = async () => {
  const copy = document.querySelectorAll(".copy");

  copy.forEach((item) => {
    const shortenLinkToCopy = document.querySelector(".shortenLinkToCopy");
    item.addEventListener("click", (e) => {
      range.selectNode(shortenLinkToCopy);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      item.innerHTML = "Copied!";
      item.classList.add("copied");
      item.style.background = "darkBlue";
      console.log(item.closest("ul"))
      addItemToLocalStorage(item.closest("ul"));
    });
  });
};

const init = () => {
  shorteningLinkByClick();
  loadLocalStorageItem(shortenLinkToRender);
  deleteItemLocalStorage(shortenLinkToRender);
  copyLink();
};

init();

document.addEventListener("click", (e) => {
  loadLocalStorageItem(shortenLinkToRender);
});

/*
<svg width="64" height="64" class="trash" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6 6 18"></path>
  <path d="m6 6 12 12"></path>
</svg> 
*/
