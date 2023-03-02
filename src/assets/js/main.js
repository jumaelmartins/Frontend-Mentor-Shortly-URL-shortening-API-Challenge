import "../styles/main.scss";
import { shorteningLinkToHtml } from "./shortening-api";

const input = document.querySelector("input");
const form = document.querySelector("form");
const shortenLinkToRender = document.querySelector(".shortenLink");
const shortenLinkToCopy = document.querySelector("shortenLinkToCopy");
const warning = document.querySelector("label");

const range = document.createRange();

const shorteningLinkByClick = async () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = input.value;

    if (!input.value) {
      input.classList.add("warning");
      warning.classList.remove("hidden");
      console.log("teste")
    } else {
      input.classList.remove("warning");
      warning.classList.add("hidden");
      shortenLinkToRender.innerHTML += await shorteningLinkToHtml(url);
    }

  });
};

const init = () => {
  shorteningLinkByClick();
};

init();
