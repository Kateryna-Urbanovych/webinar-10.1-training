import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/feedback-form.css';

const STORAGE_KEY = 'feedback-msg';
// если просто повторять 'feedback-msg', то это считается плохо - паттерн магических чисел и строк
const STORAGE_FORM = 'feedback-form';

const refs = {
  form: document.querySelector('.js-feedback-form'),
  textarea: document.querySelector('.js-feedback-form  textarea'),
  checkbox: document.querySelector('input[type="checkbox"]'),
};

console.log(refs.checkbox);

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();
populateForm();

/*
 * - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(event) {
  // Останавливаем поведение по умолчанию (перезагрузка страницы)
  event.preventDefault();
  // Нажатие кнопки Отправить
  console.log('Отправляем форму');
  // Очищаем все поля формы (останется как в html)
  event.currentTarget.reset();
  // Очищаем localStorage
  localStorage.removeItem(STORAGE_KEY); // только сообщение
  localStorage.removeItem(STORAGE_FORM); // всю форму
  refs.checkbox.removeAttribute('checked');
}

/*
 * - Получаем значение поля
 * - Сохраняем его в хранилище
 * - Можно добавить throttle (на refs.textarea.addEventListener)
 */
function onTextareaInput(event) {
  // Получаем значение поля
  const message = event.target.value;
  // если поставить event.currentTarget.value, то будет ошибка (из-за всплытия)
  // Uncaught TypeError: Cannot read property 'value' of null
  //   at HTMLTextAreaElement.onTextareaInput (02-feedback.js:41)
  //   at invokeFunc (index.js:160)
  //   at trailingEdge (index.js:207)
  //   at timerExpired (index.js:195)
  // console.log(message);
  // Сохраняем его в хранилище
  localStorage.setItem(STORAGE_KEY, message);
}

/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */
// Когда следим только за textarea !!!
function populateTextarea() {
  // Получаем значение из хранилища
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  // Если там что-то было, обновляем DOM
  if (savedMessage) {
    console.log(savedMessage);
    refs.textarea.value = savedMessage;
  }
}

// Когда следим за всей формой !!!
function populateForm() {
  // Получаем значение из хранилища
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_FORM));

  // Если там что-то было, обновляем DOM
  if (savedForm) {
    console.log(savedForm);
    const keysOfSavedForm = Object.keys(savedForm);
    // console.log(keysOfSavedForm);

    keysOfSavedForm.forEach(key => {
      console.log(refs.form[key].value);
      // console.log(savedForm[key]);
      refs.form[key].value = savedForm[key];
    });

    if (savedForm.checkbox === 'on') {
      // console.log('Чекбокс включен');
      refs.checkbox.setAttribute('checked', 'true');
    }
  }
}

// Домой
// сделать так чтобы сохраняло не только сообщение но и имя, и все в одном обьекте

const formData = {};

refs.form.addEventListener('input', event => {
  // console.log(event.target.value);
  // console.log(event.target.name);

  formData[event.target.name] = event.target.value;
  // console.log(formData);

  localStorage.setItem(STORAGE_FORM, JSON.stringify(formData));
});
