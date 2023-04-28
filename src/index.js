import keyValues from './key-values.js';

const generalContainer = document.createElement('div');
generalContainer.className = 'general-container';
document.body.append(generalContainer);

generalContainer.insertAdjacentHTML(
  'afterbegin',
  `
<textarea inputmode="text" class="textarea"></textarea>`,
);

const keyboardContainer = document.createElement('div');
keyboardContainer.className = 'keyboard-container';
generalContainer.append(keyboardContainer);

generalContainer.insertAdjacentHTML(
  'beforeend',
  `
    <p class="text"> - The keyboard was created in Windows OS.<br> 
     - To switch the language, use the combination: Ctrl + Alt.
    </p>
    `,
);

let keyboardLayout = localStorage.getItem('layout');

if (keyboardLayout === null) {
  keyboardLayout = 'en';
}

document.onkeydown = (event) => {
  for (let i = 0; i < keyValues.keyCodeExc.length; i += 1) {
    if (event.code === `${keyValues.keyCodeExc[i]}`) return true;
  }
  return false;
};

function createKeyboardLayout() {
  const keyValue = document.querySelectorAll('[data-key]');

  keyValue.forEach((e) => {
    e.textContent = keyValues.keyValueObj[keyboardLayout][e.dataset.key];
  });
}

function createKeyboardBtns() {
  for (let i = 0; i < keyValues.keyCode.length; i += 1) {
    keyboardContainer.insertAdjacentHTML(
      'beforeend',
      `
        <button id="${keyValues.keyCode[i]}" class="btn btn${i}" data-key="${keyValues.keyCode[i]}"></button>`,
    );
  }
  createKeyboardLayout();
}
createKeyboardBtns();
