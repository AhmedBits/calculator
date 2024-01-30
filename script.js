const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const ac = document.querySelector('#ac');

const enterNumbers = (e) => display.innerHTML += e.target.id;
const obtainDisplayValue = () => display.innerHTML;
const clearAll = () => {
    display.innerHTML = '';
    first = undefined;
    second = undefined;
    oldOperator = undefined;
    newOperator = undefined;
    resetDisplay = false;
    pressedEquals = false;
    pressedOperator = false;
};

clearAll();

numbers.forEach(num => num.addEventListener('click', handleNumberClick));
operators.forEach(operator => operator.addEventListener('click', handleOperatorClick));
equals.addEventListener('click', handleEqualClick);
ac.addEventListener('click', clearAll);

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => { 
    if (b == 0) {
        return undefined;
    }
    return a / b;
}
const power = (a, b) => a ** b;
const modulo = (a, b) => {
    if (b == 0) {
        return undefined;
    }
    return a % b;
}

function operate(operator, first, second) {
    switch (operator) {
        case '+':
            return add(first, second);
        case '-':
            return subtract(first, second);
        case '*':
            return multiply(first, second);
        case '/':
            return divide(first, second);
        case '^':
            return power(first, second);
        case '%':
            return modulo(first, second);
        default:
            return NaN;
    }
}

function handleNumberClick(e) {
    if (resetDisplay) {
        display.innerHTML = '';
        resetDisplay = false;
    } else if (pressedEquals) {
        clearAll();
    }
    enterNumbers(e);
    pressedOperator = false;
}

function handleOperatorClick(e) {
    newOperator = e.target.id;

    if (pressedOperator) {
        oldOperator = newOperator;
        return;
    }

    if (typeof oldOperator == 'undefined' || pressedEquals) {
        first = obtainDisplayValue();
        oldOperator = e.target.id;
        resetDisplay = true;
        pressedEquals = false;
    } else {
        second = obtainDisplayValue();
        display.innerHTML = operate(oldOperator, first, second);
        first = display.innerHTML;
        second = undefined;
        oldOperator = newOperator;
        resetDisplay = true;
    }
    pressedOperator = true;
}

function handleEqualClick() {
    if (pressedEquals || pressedOperator || typeof first == 'undefined') {
        return;
    }
    second = obtainDisplayValue();
    display.innerHTML = operate(newOperator, first, second);
    second = undefined;
    pressedEquals = true;
}