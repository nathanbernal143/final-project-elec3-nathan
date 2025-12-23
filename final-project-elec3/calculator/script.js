const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const keypad = document.querySelector('.keypad');

let currentInput = '0';
let tokens = [];

function resetCalculator() {
    currentInput = '0';
    tokens = [];
    render();
}

function render(resultValue = null) {
    const expressionText = [...tokens, currentInput].join(' ') || '0';
    expressionEl.textContent = expressionText;
    resultEl.textContent = resultValue !== null ? resultValue : currentInput || '0';
}

function appendDigit(digit) {
    if (digit === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    render();
}

function appendOperator(op) {
    if (currentInput === '' && tokens.length === 0) return;
    if (currentInput === '' && ['+', '-', '*', '/'].includes(tokens.at(-1))) {
        tokens[tokens.length - 1] = op;
        render();
        return;
    }
    tokens.push(currentInput);
    tokens.push(op);
    currentInput = '';
    render();
}

function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') currentInput = '0';
    } else if (tokens.length) {
        const last = tokens.pop();
        currentInput = ['+', '-', '*', '/'].includes(last) ? tokens.pop() || '0' : last;
    }
    render();
}

function evaluateExpression() {
    const sequence = buildSequence();
    if (sequence.length === 0) return;
    const value = compute(sequence);
    currentInput = Number.isFinite(value) ? value.toString() : '0';
    tokens = [];
    render(currentInput);
}

function buildSequence() {
    const sequence = [...tokens];
    if (currentInput !== '') sequence.push(currentInput);
    return sequence;
}

function compute(sequence) {
    const numbers = [];
    const operators = [];

    sequence.forEach((item, index) => {
        if (index % 2 === 0) {
            numbers.push(parseFloat(item));
        } else {
            operators.push(item);
        }
    });

    for (let i = 0; i < operators.length; i++) {
        const op = operators[i];
        if (op === '*' || op === '/') {
            const a = numbers[i];
            const b = numbers[i + 1];
            const result = op === '*' ? a * b : a / b;
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }

    return operators.reduce((acc, op, idx) => {
        const next = numbers[idx + 1];
        return op === '+' ? acc + next : acc - next;
    }, numbers[0]);
}

function handleAction(action) {
    if (action === 'clear') {
        resetCalculator();
    } else if (action === 'delete') {
        backspace();
    } else if (action === 'equals') {
        evaluateExpression();
    }
}

function handleKeypad(event) {
    const target = event.target.closest('button');
    if (!target) return;

    const value = target.dataset.value;
    const action = target.dataset.action;

    if (value) {
        if (['+', '-', '*', '/'].includes(value)) {
            appendOperator(value);
        } else {
            appendDigit(value);
        }
    }

    if (action) handleAction(action);
}

function handleKeyboard(event) {
    const { key } = event;

    if (key >= '0' && key <= '9') {
        appendDigit(key);
    } else if (key === '.') {
        appendDigit(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault();
        appendOperator(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        evaluateExpression();
    } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    } else if (key === 'Escape') {
        resetCalculator();
    }
}

keypad.addEventListener('click', handleKeypad);
document.addEventListener('keydown', handleKeyboard);

resetCalculator();
