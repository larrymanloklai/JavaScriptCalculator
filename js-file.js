const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let operator = '';
let operands = [];

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        if (!isNaN(value)) { // if the value is a number
            currentInput += value;
            updateDisplay(currentInput);
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            handleOperator(value);
        }
    });
});

function handleOperator(value) {
    if (currentInput !== '') {
        operands.push(parseFloat(currentInput));
        if (operands.length === 2) {
            const result = calculateResult();
            updateDisplay(result);
            operands = [result];
        }
        operator = value;
        currentInput = '';
    }
}

document.getElementById('clear').addEventListener('click', function() {
    clearAll();
});

document.getElementById('equals').addEventListener('click', function() {
    if (currentInput !== '') {
        operands.push(parseFloat(currentInput));
        const result = calculateResult();
        updateDisplay(result);
        currentInput = result.toString();
        operator = '';
        operands = [];
    }
});

function calculateResult() {
    let result;
    const [a, b] = operands;
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
        default:
            result = b;
    }
    return result;
}

function updateDisplay(value) {
    display.innerText = value;
}

function clearAll() {
    currentInput = '';
    operator = '';
    operands = [];
    updateDisplay('0');
}
