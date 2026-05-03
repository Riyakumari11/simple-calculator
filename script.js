const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

let currentValue = '';

function updateDisplay() {
    display.textContent = currentValue || '0';
}

function appendValue(value) {
    if (value === '.' && currentValue.slice(-1) === '.') return;
    if (value === '0' && currentValue === '0') return;
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentValue === '' && value !== '-') return;
        if (['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
            currentValue = currentValue.slice(0, -1) + value;
            return;
        }
    }

    currentValue += value;
}

function calculate() {
    try {
        const result = Function(`'use strict'; return (${currentValue})`)();
        currentValue = String(result);
    } catch (err) {
        currentValue = 'Error';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === 'clear') {
            currentValue = '';
        } else if (value === 'delete') {
            currentValue = currentValue.slice(0, -1);
        } else if (value === 'equals') {
            calculate();
        } else {
            appendValue(value);
        }

        updateDisplay();
    });
});

updateDisplay();
