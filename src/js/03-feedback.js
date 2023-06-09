import "../css/common.css";
import "../css/03-feedback.css";
import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";
const refs = {
  form: document.querySelector(".feedback-form"),
  textarea: document.querySelector(".feedback-form textarea"),
  input: document.querySelector("input"),
};
const formData = {};

populateTextarea();

refs.form.addEventListener("input", throttle(onTextareaInput, 500));

function onSubmit(e) {
  e.preventDefault();
  if (refs.textarea.value === "" || refs.input.value === "") {
      return alert('всі поля повинні бути заповнені')
    }
  e.currentTarget.reset();
  const objData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
}

refs.form.addEventListener("submit", onSubmit);

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage === null) {
    return;
  }
  refs.textarea.value = savedMessage["message"] || "";
  refs.input.value = savedMessage["email"] || "";
}
