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
};

clearAll();

numbers.forEach(num => num.addEventListener('click', (e) => {
    if (resetDisplay) {
        display.innerHTML = '';
        enterNumbers(e);
        resetDisplay = false;
    } else if (pressedEquals) {
        clearAll();
        enterNumbers(e);
    } else {
        enterNumbers(e);
    }
}));

operators.forEach(operator => operator.addEventListener('click', (e) => {
    // If this is a new compute, the oldOperator is the clicked event
    if (typeof oldOperator == 'undefined') {
        oldOperator = e.target.id;
    }
    newOperator = e.target.id;

    // If this is a new compute, store the current display value 
    // as the first variable in a future operation
    if (typeof first == 'undefined' || pressedEquals) {
        first = obtainDisplayValue();
        resetDisplay = true;
        pressedEquals = false;
        oldOperator = e.target.id;
    } else { 
        // If this is a continued compute, the current calculation result 
        // will be stored as the first variable in a future operation

        second = obtainDisplayValue();
        display.innerHTML = operate(oldOperator, first, second);
        first = display.innerHTML;
        second = undefined;
        oldOperator = newOperator;
        resetDisplay = true;
    }
}));

equals.addEventListener('click', () => {
    second = obtainDisplayValue();
    display.innerHTML = operate(newOperator, first, second);
    second = undefined;
    pressedEquals = true;
});

ac.addEventListener('click', clearAll);

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => { 
    if (b == 0) {
        console.log('ERROR');
        return NaN;
    }
    return a / b;
}
const power = (a, b) => a ** b;
const modulo = (a, b) => {
    if (b == 0) {
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
