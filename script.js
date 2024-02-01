const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const ac = document.querySelector("#ac");

const enterNumbers = (e) => (display.innerHTML += e.target.id);
const obtainDisplayValue = () => display.innerHTML;
const clearAll = () => {
  display.innerHTML = "";
  first = undefined;
  second = undefined;
  oldOperator = undefined;
  newOperator = undefined;
  resetDisplay = false;
  pressedEquals = false;
  pressedOperator = false;
  decimalClicked = false;
};
const rounded = (num) => num.toFixed(3);

clearAll();

numbers.forEach((num) => num.addEventListener("click", handleNumberClick));
operators.forEach((operator) => operator.addEventListener("click", handleOperatorClick));
equals.addEventListener("click", handleEqualClick);
ac.addEventListener("click", clearAll);

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b == 0) {
    return undefined;
  }
  return a / b;
};
const power = (a, b) => a ** b;
const modulo = (a, b) => {
  if (b == 0) {
    return undefined;
  }
  return a % b;
};

function operate(operator, first, second) {
  switch (operator) {
    case "+":
      return rounded(add(first, second)).replace(/\.?0+$/, '');;
    case "-":
      return rounded(subtract(first, second)).replace(/\.?0+$/, '');;
    case "*":
      return rounded(multiply(first, second)).replace(/\.?0+$/, '');;
    case "/":
      return rounded(divide(first, second)).replace(/\.?0+$/, '');;
    case "^":
      return rounded(power(first, second)).replace(/\.?0+$/, '');;
    case "%":
      return rounded(modulo(first, second)).replace(/\.?0+$/, '');;
    default:
      return NaN;
  }
}

function handleNumberClick(e) {
  if (resetDisplay) {
    display.innerHTML = "";
    resetDisplay = false;
  } else if (pressedEquals) {
    clearAll();
  }
  if (e.target.id === '.') {
    if (decimalClicked === true) {
      return;
    }
    decimalClicked = true;
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

  if (typeof oldOperator == "undefined" || pressedEquals) {
    first = obtainDisplayValue();
    oldOperator = e.target.id;
    resetDisplay = true;
    pressedEquals = false;
    decimalClicked = false;
  } else {
    second = obtainDisplayValue();
    display.innerHTML = operate(oldOperator, first, second);
    first = display.innerHTML;
    oldOperator = newOperator;
    second = undefined;
    resetDisplay = true;
    decimalClicked = false;
  }
  pressedOperator = true;
}

function handleEqualClick() {
  if (pressedEquals || pressedOperator || typeof first == "undefined") {
    return;
  }
  second = obtainDisplayValue();
  display.innerHTML = operate(newOperator, first, second);
  second = undefined;
  pressedEquals = true;
  decimalClicked = false;
}
