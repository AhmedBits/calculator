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
    operater = undefined;
};

let operator, first, second;

numbers.forEach(num => num.addEventListener('click', enterNumbers));

operators.forEach(operate => operate.addEventListener('click', (e) => {
    operator = e.target.id;
    first = obtainDisplayValue();
    display.innerHTML = '';
}));

equals.addEventListener('click', () => {
    second = obtainDisplayValue();
    display.innerHTML = operate(operator, first, second);
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
