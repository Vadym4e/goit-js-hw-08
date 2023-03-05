import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name = "email"]');
const message = document.querySelector('textarea[name = "message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(evt => {
    const objectToSave = { email: email.value, message: message.value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

form.addEventListener('submit', evt => {
  evt.preventDefault();

  if (email.value === '' || message.value === '') {
    return alert('Треба заповнити усі поля');
  }

  console.log({ email: email.value, message: message.value });

  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const storageData = load(LOCALSTORAGE_KEY);

if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}
