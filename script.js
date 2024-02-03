const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const ac = document.querySelector("#ac");

const enterNumbers = (e) => (display.innerHTML += e);
const obtainDisplayValue = () => display.innerHTML;
const rounded = (num) => num.toFixed(3);
const clearPushedOperators = () => operators.forEach((btn) => btn.classList.remove("highlight"));
const clearAll = () => {
  display.innerHTML = "";
  first = undefined;
  second = undefined;
  oldOperator = undefined;
  newOperator = undefined;
  resetDisplay = false;
  pressedEquals = false;
  pressedOperator = false;
  pressedDecimal = false;
  clearPushedOperators();
};

clearAll();

document.addEventListener("keydown", handleKeyClick);
numbers.forEach((num) => num.addEventListener("click", handleNumberClick));
operators.forEach((operator) => operator.addEventListener("click", handleOperatorClick));
equals.addEventListener("click", handleEqualClick);
ac.addEventListener("click", clearAll);

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b == 0) {
    return NaN;
  }
  return a / b;
};
const power = (a, b) => a ** b;
const modulo = (a, b) => {
  if (b == 0) {
    return NaN;
  }
  return a % b;
};

function operate(operator, first, second) {
  switch (operator) {
    case "+":
      return rounded(add(first, second)).replace(/\.?0+$/, "");
    case "-":
      return rounded(subtract(first, second)).replace(/\.?0+$/, "");
    case "*":
      return rounded(multiply(first, second)).replace(/\.?0+$/, "");
    case "/":
      return rounded(divide(first, second)).replace(/\.?0+$/, "");
    case "^":
      return rounded(power(first, second)).replace(/\.?0+$/, "");
    case "%":
      return rounded(modulo(first, second)).replace(/\.?0+$/, "");
    default:
      return NaN;
  }
}

function handleNumberClick(e) {
  let clickedNumber = e.target ? e.target.id : e;

  if (resetDisplay) {
    display.innerHTML = "";
    resetDisplay = false;
  } else if (pressedEquals) {
    clearAll();
  }
  if (clickedNumber === ".") {
    if (pressedDecimal === true) {
      return;
    }
    pressedDecimal = true;
  }
  enterNumbers(clickedNumber);
  pressedOperator = false;
}

function handleOperatorClick(e) {
  let clickedOperator = e.target ? e.target.id : e;
  newOperator = clickedOperator;

  if (pressedOperator) {
    pushOperator(newOperator, oldOperator);
    oldOperator = newOperator;
    return;
  }

  if (typeof oldOperator == "undefined" || pressedEquals) {
    first = obtainDisplayValue();
    oldOperator = clickedOperator;
    resetDisplay = true;
    pressedEquals = false;
    pressedDecimal = false;
    pushOperator(newOperator, oldOperator);
  } else {
    second = obtainDisplayValue();
    display.innerHTML = operate(oldOperator, first, second);
    first = display.innerHTML;
    pushOperator(newOperator, oldOperator);
    oldOperator = newOperator;
    second = undefined;
    resetDisplay = true;
    pressedDecimal = false;
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
  pressedDecimal = false;
  clearPushedOperators();
}

function handleKeyClick(e) {
  let key = e.key;

  if (!isNaN(key) || key === ".") {
    handleNumberClick(key);
  } else if (key === "Enter") {
    e.preventDefault();
    handleEqualClick();
  } else if (key === "Backspace") {
    let string = display.innerHTML;
    display.innerHTML = string.slice(0, -1);
  } else {
    operators.forEach((operator) => {
      if (key === operator.id) {
        handleOperatorClick(key);
      }
    });
  }
}

function pushOperator(newOperator, oldOperator) {
  let a = document.getElementById(newOperator);
  let b = document.getElementById(oldOperator);

  if (a === b) {
    a.classList.add("highlight");
    return;
  }
  a.classList.add("highlight");
  b.classList.remove("highlight");
}
