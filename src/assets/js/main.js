import '../styles/main.scss';
import { shorteningLink } from './shortening-api';

const input = document.querySelector("input");
const form = document.querySelector("form");

form.addEventListener("submit", (e)=> {
  e.preventDefault();
  console.log(input.value)
})




const init = () => {

}

init();
