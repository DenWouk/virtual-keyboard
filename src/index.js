import keyValues from './key-values.js';

const generalContainer = document.createElement('div');
generalContainer.className = 'general-container';
document.body.append(generalContainer);

const keyboardContainer = document.createElement('div');
keyboardContainer.className = 'keyboard-container';
generalContainer.append(keyboardContainer);

generalContainer.insertAdjacentHTML(
  'afterbegin',
  `
<textarea inputmode="text" class="textarea"></textarea>`,
);

generalContainer.insertAdjacentHTML(
  'beforeend',
  `
    <p class="text"> - The keyboard was created in Windows OS.<br> 
     - To switch the language, use the combination: Ctrl + Alt.
    </p>
    `,
);

let keyboardLayout = localStorage.getItem('layout');

let capsStatus;
const shiftBtns = document.querySelectorAll('.btn42, .btn54');

if (keyboardLayout === null) {
  keyboardLayout = 'en';
}

document.onkeydown = (event) => {
  for (let i = 0; i < keyValues.keyCodeExc.length; i += 1) {
    if (event.code === `${keyValues.keyCodeExc[i]}`) {
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

function changeKeyboardShiftOn() {
  if (keyboardLayout === 'en') {
    capsStatus = 'off';
    keyboardLayout = 'enShift';
  } else if (keyboardLayout === 'by') {
    capsStatus = 'off';
    keyboardLayout = 'byShift';
  } else if (keyboardLayout === 'enCaps') {
    capsStatus = 'on';
    keyboardLayout = 'enShift';
  } else if (keyboardLayout === 'byCaps') {
    capsStatus = 'on';
    keyboardLayout = 'byShift';
  }

  createKeyboardLayout();
}

function changeKeyboardShiftOff() {
  if (keyboardLayout === 'enShift' && capsStatus === 'off') {
    keyboardLayout = 'en';
  } else if (keyboardLayout === 'byShift' && capsStatus === 'off') {
    keyboardLayout = 'by';
  } else if (keyboardLayout === 'enShift' && capsStatus === 'on') {
    keyboardLayout = 'enCaps';
  } else if (keyboardLayout === 'byShift' && capsStatus === 'on') {
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
