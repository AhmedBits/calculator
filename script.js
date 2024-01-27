const add = (a, b) => a + b;
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

let operator, first, second;

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