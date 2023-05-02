import keyValues from './key-values.js';

const keyboardContainer = document.createElement('div');
keyboardContainer.className = 'keyboard-container';
document.body.append(keyboardContainer);

const buttonsContainer = document.createElement('div');
buttonsContainer.className = 'buttons-container';
keyboardContainer.append(buttonsContainer);

keyboardContainer.insertAdjacentHTML(
  'afterbegin',
  `
    <textarea class="textarea" spellcheck="false"></textarea>
  `,
);

keyboardContainer.insertAdjacentHTML(
  'afterbegin',
  `
    <div class="information-text-container">
      <p class="information-text">Designed for Windows OS.</p>
      <p class="information-text">Switch language (EN/BY): Ctrl + Alt.</p>
    </div>
  `,
);

let keyboardLayout = localStorage.getItem('layout');
let capsStatus;
let keyId;

const textarea = document.querySelector('.textarea');

if (keyboardLayout === null) {
  keyboardLayout = 'en';
}

document.onkeydown = (event) => {
  for (let i = 0; i < keyValues.keyCodeException.length; i += 1) {
    if (event.code === `${keyValues.keyCodeException[i]}`) {
      return true;
    }
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
  const buttons = [];

  for (let i = 0; i < keyValues.keyCode.length; i += 1) {
    buttons.push(
      `<button id="${keyValues.keyCode[i]}" class="btn btn${i}" data-key="${keyValues.keyCode[i]}"></button>`,
    );
  }

  buttonsContainer.insertAdjacentHTML(
    'beforeend',
    `
    <div class="buttons-row">${buttons.slice(0, 14).join('')}</div>
    <div class="buttons-row">${buttons.slice(14, 29).join('')}</div>
    <div class="buttons-row">${buttons.slice(29, 42).join('')}</div>
    <div class="buttons-row">${buttons.slice(42, 55).join('')}</div>
    <div class="buttons-row">${buttons.slice(55).join('')}</div>
    `,
  );

  createKeyboardLayout();
}
createKeyboardBtns();

function changeKeyboardLang() {
  if (keyboardLayout === 'en') {
    keyboardLayout = 'by';
    localStorage.setItem('layout', keyboardLayout);
  } else if (keyboardLayout === 'by') {
    keyboardLayout = 'en';
    localStorage.setItem('layout', keyboardLayout);
  } else if (keyboardLayout === 'enCaps') {
    keyboardLayout = 'byCaps';
    localStorage.setItem('layout', 'by');
  } else if (keyboardLayout === 'byCaps') {
    keyboardLayout = 'enCaps';
    localStorage.setItem('layout', 'en');
  }

  createKeyboardLayout();
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    changeKeyboardLang();
  }
});

function changeKeyboardCaps() {
  const capsKey = document.querySelector('.btn29');

  if (keyboardLayout === 'en') {
    keyboardLayout = 'enCaps';
    capsKey.classList.add('active');
  } else if (keyboardLayout === 'by') {
    keyboardLayout = 'byCaps';
    capsKey.classList.add('active');
  } else if (keyboardLayout === 'enCaps') {
    keyboardLayout = 'en';
    capsKey.classList.remove('active');
  } else if (keyboardLayout === 'byCaps') {
    keyboardLayout = 'by';
    capsKey.classList.remove('active');
  }

  createKeyboardLayout();
}

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') {
    changeKeyboardCaps();
  }
});

const shiftBtns = document.querySelectorAll('.btn42, .btn54');

function changeKeyboardShiftOn() {
  if (keyboardLayout === 'en') {
    capsStatus = 'off';
    keyboardLayout = 'enShift';
  } else if (keyboardLayout === 'by') {
    capsStatus = 'off';
    keyboardLayout = 'byShift';
  } else if (keyboardLayout === 'enCaps') {
    capsStatus = 'on';
    keyboardLayout = 'enShiftWithCaps';
  } else if (keyboardLayout === 'byCaps') {
    capsStatus = 'on';
    keyboardLayout = 'byShiftWithCaps';
  }

  createKeyboardLayout();
}

function changeKeyboardShiftOff() {
  if (keyboardLayout === 'enShift' && capsStatus === 'off') {
    keyboardLayout = 'en';
  } else if (keyboardLayout === 'byShift' && capsStatus === 'off') {
    keyboardLayout = 'by';
  } else if (keyboardLayout === 'enShiftWithCaps' && capsStatus === 'on') {
    keyboardLayout = 'enCaps';
  } else if (keyboardLayout === 'byShiftWithCaps' && capsStatus === 'on') {
    keyboardLayout = 'byCaps';
  }

  createKeyboardLayout();
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    changeKeyboardShiftOn();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    changeKeyboardShiftOff();
  }
});

shiftBtns.forEach((el) => el.addEventListener('mousedown', changeKeyboardShiftOn));
shiftBtns.forEach((el) => el.addEventListener('mouseup', changeKeyboardShiftOff));

function focusInTextarea() {
  textarea.focus();
}
focusInTextarea();
document.addEventListener('click', focusInTextarea);
document.addEventListener('keydown', focusInTextarea);

function displayInTextareaOnclick(event) {
  let btnCurrentValue = event.target.textContent;

  if (!event.target.classList.contains('btn')) return;

  if (event.target.classList.contains('btn13')) {
    btnCurrentValue = '';
    const pos = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, pos - 1) + textarea.value.slice(pos);
    textarea.setSelectionRange(pos - 1, pos - 1);
  }

  if (event.target.classList.contains('btn14')) {
    btnCurrentValue = '    ';
  }

  if (event.target.classList.contains('btn28')) {
    btnCurrentValue = '';

    const pos = textarea.selectionStart;

    textarea.value = textarea.value.slice(0, pos) + textarea.value.slice(pos + 1);
    textarea.setSelectionRange(pos, pos);
  }

  if (event.target.classList.contains('btn29')) {
    btnCurrentValue = '';
    changeKeyboardCaps();
  }

  if (event.target.classList.contains('btn41')) {
    btnCurrentValue = '';

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const cursor = `${textarea.value.slice(0, start)}\n`;

    textarea.value = `${textarea.value.slice(0, start)}\n${textarea.value.slice(end, textarea.value.length)}`;
    textarea.focus();
    textarea.setSelectionRange(cursor.length, cursor.length);
  }

  if (
    event.target.classList.contains('btn42')
    || event.target.classList.contains('btn54')
    || event.target.classList.contains('btn55')
    || event.target.classList.contains('btn56')
    || event.target.classList.contains('btn57')
    || event.target.classList.contains('btn59')
    || event.target.classList.contains('btn63')
  ) {
    btnCurrentValue = '';
  }

  if (event.target.classList.contains('btn58')) {
    btnCurrentValue = ' ';
  }

  textarea.value += `${btnCurrentValue}`;
}
document.addEventListener('click', displayInTextareaOnclick);

function displayInTextareaOnkeydown(event) {
  for (let i = 0; i < keyValues.keyCodeException.length; i += 1) {
    keyId = document.getElementById(`${keyValues.keyCodeException[i]}`);
    if (event.code === keyId.id) return;
  }

  if (event.code === 'Tab') {
    textarea.value += '    ';
    return;
  }

  if (event.code === 'AltLeft' || event.code === 'AltRight') {
    textarea.value += '';
    return;
  }

  for (let i = 0; i < keyValues.keyCode.length; i += 1) {
    keyId = document.getElementById(`${keyValues.keyCode[i]}`);
    if (event.code === keyId.id) {
      textarea.value += keyId.textContent;
    }
  }
  textarea.scrollTop = textarea.scrollHeight;
}
document.addEventListener('keydown', displayInTextareaOnkeydown);

function animationBtnOn(event) {
  if (event.code === 'CapsLock') return;

  for (let i = 0; i < keyValues.keyCode.length; i += 1) {
    keyId = document.getElementById(`${keyValues.keyCode[i]}`);
    if (event.code === keyId.id) {
      keyId.classList.add('active');
    }
  }
}

function animationBtnOff(event) {
  if (event.code === 'CapsLock') return;

  for (let i = 0; i < keyValues.keyCode.length; i += 1) {
    keyId = document.getElementById(`${keyValues.keyCode[i]}`);
    if (event.code === keyId.id) {
      keyId.classList.remove('active');
    }
  }
}
document.addEventListener('keydown', animationBtnOn);
document.addEventListener('keyup', animationBtnOff);
