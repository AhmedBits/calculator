const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const ac = document.querySelector('#ac');

const enterNumbers = (e) => display.innerHTML += e.target.id;
const obtainDisplayValue = () => display.innerHTML;
const clear = () => {
    display.innerHTML = '';
    first = undefined;
    second = undefined;
    oldOperator = undefined;
    newOperator = undefined;
    reset = false;
};

clear();

numbers.forEach(num => num.addEventListener('click', (e) => {
    if (reset) {
        display.innerHTML = '';
        enterNumbers(e);
        reset = false;
    } else {
        enterNumbers(e);
    }
}));

operators.forEach(operator => operator.addEventListener('click', (e) => {
    if (typeof oldOperator == 'undefined') {
        oldOperator = e.target.id;
    }
    newOperator = e.target.id;

    if (typeof first == 'undefined') {
        first = obtainDisplayValue();
        reset = true;

    } else {
        second = obtainDisplayValue();
        display.innerHTML = operate(oldOperator, first, second);
        first = display.innerHTML;
        second = undefined;
        oldOperator = newOperator;
        reset = true;
    }
}));

equals.addEventListener('click', () => {
    second = obtainDisplayValue();
    display.innerHTML = operate(newOperator, first, second);
    second = undefined;
});

ac.addEventListener('click', clear);

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, b) => a ** b;
const modulo = (a, b) => {
    if (b === 0) {
        console.log('ERROR');
        return NaN;
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
            console.log('ERROR');
            return NaN;
    }
}
