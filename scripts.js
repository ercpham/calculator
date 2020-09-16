const OPERATIONS = 
{
    "+": add,
    "-": subtract,
    "x": multiply,
    "/": divide,
    "": empty
}

let lastSavedNumber = "";
let lastOperation= "";
let nextClear = false;
let onFunction = false;

/**
 * Takes two numbers and performs a specified operation on them
 */
function operate(a, b, operation) {
    return OPERATIONS[operation](a,b);
}

function empty() {
    return "";
}

function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function clear() {
    clearScreen();
    lastOperation = "";
}

function clearScreen() {
    let output = document.getElementById("output");
    output.textContent = "";
}

function equalPress() {
    eval();
    lastOperation = "";
}

function eval() {
    let output = document.getElementById("output");
    let thisNumber = output.textContent;
    clearScreen();
    output.textContent += operate(parseInt(lastSavedNumber), parseInt(thisNumber), lastOperation);
    nextClear = true;
}

function appendNumber() {
    if (nextClear) {
        clearScreen();
        nextClear = false;
        onFunction = false;
    }
    let output = document.getElementById("output");
    let numText = this.textContent;
    output.textContent += numText;
}

function storeAndReplace() {
    if (!onFunction && lastOperation !== "") {
        eval();
        lastOperation = "";
    }
    lastSavedNumber = document.getElementById("output").textContent;
    lastOperation = this.textContent;
    nextClear = true;
    onFunction = true;
}

function listenNumButtons(button) {
    button.addEventListener("click", appendNumber);
}

function listenFuncButtons(button) {
    button.addEventListener("click", storeAndReplace);
}

function addButtonListeners() {
    let clrButton = document.getElementById("clear");
    clrButton.addEventListener("click", clear);
    let eqlButton = document.getElementById("equals");
    eqlButton.addEventListener("click", equalPress);
    let numButtons = document.querySelectorAll(".number");
    numButtons.forEach(listenNumButtons);
    let funcButtons = document.querySelectorAll(".function");
    funcButtons.forEach(listenFuncButtons);
}

addButtonListeners();