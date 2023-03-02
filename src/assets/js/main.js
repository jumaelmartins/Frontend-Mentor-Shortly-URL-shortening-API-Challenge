import "../styles/main.scss";
import { shorteningLinkToHtml } from "./shortening-api";

const input = document.querySelector("input");
const form = document.querySelector("form");
const shortenLinkToRender = document.querySelector(".shortenLink");
const shortenLinkToCopy = document.querySelector("shortenLinkToCopy");

const range = document.createRange();

const shorteningLinkByClick = async () => {

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = input.value;

    shortenLinkToRender.innerHTML = await shorteningLinkToHtml(url);
  });


};

const init = () => {
  shorteningLinkByClick();
};

init();
