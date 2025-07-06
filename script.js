const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay();
}

function inputDecimal(dot) {
    if (waitingForSecondOperand) {
        currentInput = '0.';
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        currentInput = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

const performCalculation = {
    '/': (first, second) => first / second,
    '*': (first, second) => first * second,
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    '=': (first, second) => second
};

function handleFunction(func) {
    switch (func) {
        case 'AC':
            clearCalculator();
            break;
        case '+/-':
            currentInput = String(parseFloat(currentInput) * -1);
            updateDisplay();
            break;
        case '%':
            currentInput = String(parseFloat(currentInput) / 100);
            updateDisplay();
            break;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { value } = event.target.dataset;

        if (event.target.classList.contains('number')) {
            inputDigit(value);
        } else if (event.target.classList.contains('operator')) {
            handleOperator(value);
        } else if (event.target.classList.contains('function')) {
            if (value === '.') {
                inputDecimal(value);
            } else {
                handleFunction(value);
            }
        }
    });
});

updateDisplay(); 
