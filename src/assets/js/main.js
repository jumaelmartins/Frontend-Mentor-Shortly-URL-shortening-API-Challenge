import "../styles/main.scss";
import { shorteningLink, shorteningLinkToHtml } from "./shortening-api";

const input = document.querySelector("input");
const form = document.querySelector("form");
const shortenLinkToRender = document.querySelector(".shortenLink");
const warning = document.querySelector("label");

const range = document.createRange();

const shorteningLinkByClick = async () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = input.value;
    const validation = await formValidate(url);

    validation
      ? (shortenLinkToRender.innerHTML += await shorteningLinkToHtml(url))
      : "";
    copyLink();
  });
};

const formValidate = async (value) => {
  if ((await shorteningLink(value)) === false || !value) {
    input.classList.add("warning");
    warning.classList.remove("hidden");
    console.log(await shorteningLink(value));
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
      console.log(item, shortenLinkToCopy);
    });
  });
};

const init = () => {
  shorteningLinkByClick();
};

init();
