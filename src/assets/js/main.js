import "../styles/main.scss";
import { shorteningLink, shorteningLinkToHtml } from "./shortening-api";

const input = document.querySelector("input");
const form = document.querySelector("form");
const shortenLinkToRender = document.querySelector(".shortenLink");
const warning = document.querySelector("label");
const range = document.createRange();
let itemsToLocalStorage = [];


const addItemToLocalStorage = async (item) => {
  if (localStorage.itemToStorage) {
    itemsToLocalStorage = JSON.parse(localStorage.getItem("itemToStorage"));
  }

  let ul = document.querySelector(".shortenLinks > :first-child")
  ul.toString
  itemsToLocalStorage.push(ul.innerHTML);
  localStorage.itemToStorage = JSON.stringify(itemsToLocalStorage);
};

const loadLocalStorageItem = async (item) => {
  item.innerHTML = "";

  if (localStorage.itemToStorage) {
    itemsToLocalStorage = JSON.parse(localStorage.getItem("itemToStorage"));
  }

for (let localItem in itemsToLocalStorage) {
  item.innerHTML = itemsToLocalStorage[localItem];
  console.log(itemsToLocalStorage[localItem])
}
}

loadLocalStorageItem(shortenLinkToRender);


const shorteningLinkByClick = async () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = input.value;
    const validation = await formValidate(url);

    validation
      ? (shortenLinkToRender.innerHTML += await shorteningLinkToHtml(url))
      : "";
    console.log(shortenLinkToRender)
    addItemToLocalStorage(shortenLinkToRender);
    copyLink();
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
      e.preventDefault();
      range.selectNode(shortenLinkToCopy);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      console.log(item, shortenLinkToCopy);
      item.innerHTML = "Copied!"
      item.classList.add("copied")

    });
  });
};




const init = () => {
  shorteningLinkByClick();
};

init();
