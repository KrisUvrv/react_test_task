const state = {
  inputs: [], justCalculated: false, result: null,
}

const BUTTONS = [{
  value: '<', color: 'grey', type: 'delete',
}, {
  value: 'AC', color: 'grey', type: 'clear',
}, {
  value: '%', color: 'inactive', type: 'percent',
}, {
  value: '/', color: 'orange', type: 'operator',
}, {
  value: '7', color: 'dark-grey', type: 'number',
}, {
  value: '8', color: 'dark-grey', type: 'number',
}, {
  value: '9', color: 'dark-grey', type: 'number',
}, {
  value: '*', color: 'orange', type: 'operator',
}, {
  value: '4', color: 'dark-grey', type: 'number',
}, {
  value: '5', color: 'dark-grey', type: 'number',
}, {
  value: '6', color: 'dark-grey', type: 'number',
}, {
  value: '-', color: 'orange', type: 'operator',
}, {
  value: '1', color: 'dark-grey', type: 'number',
}, {
  value: '2', color: 'dark-grey', type: 'number',
}, {
  value: '3', color: 'dark-grey', type: 'number',
}, {
  value: '+', color: 'orange', type: 'operator',
}, {
  value: '+/-', color: 'dark-grey', type: 'sign',
}, {
  value: '0', color: 'dark-grey', type: 'number',
}, {
  value: '.', color: 'dark-grey', type: 'fraction',
}, {
  value: '=', color: 'orange', type: 'equals',
},];
const OPERATORS = [{
  symbol: '+', func: (a, b) => a + b,
}, {
  symbol: '-', func: (a, b) => a - b,
}, {
  symbol: '*', func: (a, b) => a * b,
}, {
  symbol: '/', func: (a, b) => a / b
},];
const KEY_MAP = {
  '+': {value: '+', type: 'operator'},
  '-': {value: '-', type: 'operator'},
  '*': {value: '*', type: 'operator'},
  '/': {value: '/', type: 'operator'},
  '=': {value: '=', type: 'equals'},
  Enter: {value: '=', type: 'equals'},
  Backspace: {value: '<', type: 'delete'},
  Escape: {value: 'AC', type: 'clear'},
  '.': {value: '.', type: 'fraction'},
  ',': {value: '.', type: 'fraction'},
};

const calculate = (inputs) => {
  let arr = [...inputs];

  for (let i = 1; i < arr.length; i++) {
    const operator = OPERATORS.find(op => op.symbol === arr[i]);

    if (arr[i] === '*' || arr[i] === '/') {
      if (arr[i] === '/' && Number(arr[i + 1]) === 0) {
        return 'error';
      }
      const result = operator.func(Number(arr[i - 1]), Number(arr[i + 1])).toFixed(2).replace(/\.?0+$/, '');
      arr.splice(i - 1, 3, result);
      i--;
    }
  }

  for (let i = 1; i < arr.length; i++) {
    const operator = OPERATORS.find(op => op.symbol === arr[i]);
    const result = operator.func(Number(arr[i - 1]), Number(arr[i + 1])).toFixed(2).replace(/\.?0+$/, '');
    arr.splice(i - 1, 3, result);
    i--;
  }
  return arr.toString();
}

const currentDisplay = document.querySelector('.display-current');
const historyDisplay = document.querySelector('.display-history');

const getInputLength = () => {
  return state.inputs.join('').length;
}
const changeFontSize = () => {

  const length = getInputLength();
  currentDisplay.style.fontSize = '56px';

  if (length > 14) {
    currentDisplay.style.fontSize = '22px';
  } else if (length > 10) {
    currentDisplay.style.fontSize = '28px';
  } else if (length > 7) {
    currentDisplay.style.fontSize = '36px';
  }
}

const renderDisplay = () => {

  if (!state.inputs.length && !state.justCalculated) {
    currentDisplay.innerHTML = '0';
    historyDisplay.innerHTML = '';
    changeFontSize();
    return;
  }

  if (state.justCalculated) {
    currentDisplay.innerHTML = state.result;
    historyDisplay.innerHTML = state.inputs.join('');
  } else {
    currentDisplay.innerHTML = state.inputs.join('');
    historyDisplay.innerHTML = '';
  }
  changeFontSize();
}


const isOperator = (value) => {
  return OPERATORS.some((op) => op.symbol === value);
}
const handleButtonClick = (value, type) => {

  let last = state.inputs[state.inputs.length - 1];

  if (type === 'number') {

    if (state.justCalculated) {
      state.inputs = [value];
      state.result = null;
      state.justCalculated = false;
      renderDisplay();
      return;
    }

    let last = state.inputs[state.inputs.length - 1];

    if (last && last === String(state.result)) {
      state.inputs = [value];
      state.result = null;
      renderDisplay();
      return;
    }

    if (!state.inputs.length) {
      state.inputs.push(value);
    } else if (!isOperator(last)) {
      if (last === '0' && value === '0') return;
      if (last === '0' && value !== '0') {
        state.inputs[state.inputs.length - 1] = value;
      } else {
        state.inputs[state.inputs.length - 1] += value;
      }
    } else {
      state.inputs.push(value);
    }
  } else if (type === 'operator') {
    if (state.result === 'error') return;
    if (state.justCalculated) {
      state.inputs = [String(state.result)];
      state.justCalculated = false;
    }

    if (state.inputs.length === 0) {
      return;
    }
    if (isOperator(last)) {
      if (last === value) {

      } else {
        state.inputs[state.inputs.length - 1] = value;
      }

    } else {
      state.inputs.push(value);
    }
  } else if (type === 'equals') {
    if (isOperator(last)) return;
    state.result = calculate(state.inputs);
    state.justCalculated = true;
  } else if (type === 'delete') {
    if (state.result === 'error') return;
    if (state.justCalculated) {
      state.inputs = [String(state.result)];
      state.justCalculated = false;
      last = state.inputs[state.inputs.length - 1];
    }

    if (state.inputs.length === 0) return;

    if (isOperator(last)) {
      state.inputs.pop();
    } else {
      if (last.length > 1) {
        state.inputs[state.inputs.length - 1] = last.slice(0, -1);
      } else if (last.length === 1) {
        state.inputs.pop()
      }
    }

  } else if (type === 'clear') {

    state.inputs = [];
    state.justCalculated = false;
    state.result = null;

  } else if (type === 'percent') return;

  else if (type === 'fraction') {
    if (state.justCalculated && state.result !== 'error') {
      state.justCalculated = false;

      if (String(state.result).includes('.')) {
        state.inputs = [String(state.result)];
      } else {
        state.inputs = [String(state.result) + '.'];
      }
      renderDisplay();
      return;
    }
    if (state.result === 'error') {
      state.inputs = ['0.'];
      state.result = null;
      state.justCalculated = false;
      renderDisplay();
      return;
    }

    if (!state.inputs.length || isOperator(last)) {
      state.inputs.push('0.');
    } else if (last.includes('.')) {
      return;
    } else {
      state.inputs[state.inputs.length - 1] += '.';
    }

    renderDisplay();

  } else if (type === 'sign') {

    if (state.justCalculated && state.result !== 'error') {
      state.inputs = [String(state.result)];
      state.justCalculated = false;
      last = state.inputs[state.inputs.length - 1];
    }
    if (state.inputs.length === 0) return;
    if (last === '0' || last === '0.') return;

    if (isOperator(last)) {
      return;
    } else {
      if (last.startsWith('-')) {
        last = last.slice(1);
      } else {
        last = '-' + last;
      }
    }
    state.inputs[state.inputs.length - 1] = last;
  }
  renderDisplay();
}

const buttonContainer = document.getElementById('buttons');
BUTTONS.forEach((button) => {
  const element = document.createElement('button');
  element.innerHTML = button.value;
  element.className = button.color;
  element.tabIndex = -1;
  buttonContainer.appendChild(element);

  element.onclick = () => {
    handleButtonClick(button.value, button.type);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    return;
  }
  if (e.key >= '0' && e.key <= '9') {
    handleButtonClick(e.key, 'number');
    return;
  }

  const mapped = KEY_MAP[e.key];
  if (mapped) {
    handleButtonClick(mapped.value, mapped.type);
  }
});







