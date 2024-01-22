const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const mulitply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator, first, second;

function operate(operator, first, second) {
    switch (operator) {
        case 'add':
            add(first, second);
        case 'subtract':
            subtract(first, second);
        case 'multiply':
            mulitply(first, second);
        case 'divide':
            divide(first, second);
        default:
            console.log('ERROR');
    }
}