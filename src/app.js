import { Idea } from "./ideas";
import { isValid } from "./utils";
import "./styles.css";
const form = document.getElementById("form"); //(elementId: 'form')
const input = form.querySelector("#idea-input");
const submitBtn = form.querySelector("#submit");

form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", (event) => {
  const value = event.target.value;
  submitBtn.disabled = !isValid(value);
});

function submitFormHandler(event) {
  event.preventDefault();
  if (isValid(input.value)) {
    const idea = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };
    submitBtn.disabled = true;
    //Async request to server to save question
    Idea.create(idea).then(() => {
      input.value = "";
      input.className = "";
      submitBtn.disabled = false;
    });
  }
}
