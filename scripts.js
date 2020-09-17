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
    lastSavedNumber = "";
}

function clearScreen() {
    let output = document.getElementById("output");
    output.textContent = "";
    document.getElementById("overflow").style.display = "none";
}

function equalPress() {
    if (lastOperation !== "")
        eval();
    lastOperation = "";
    nextClear = true;
}

function eval() {
    let output = document.getElementById("output");
    let thisNumber = output.textContent;
    clearScreen();
    console.log(lastSavedNumber);
    if (lastSavedNumber !== "" && lastSavedNumber !== ".")
        output.textContent += operate(parseFloat(lastSavedNumber), parseFloat(thisNumber), lastOperation);
    let numbersOnScreen = output.textContent.match(/\d/g) === null ? 0 : output.textContent.match(/\d/g).length;
    if (numbersOnScreen > 8) {
        document.getElementById("overflow").style.display = "block";
        output.textContent = output.textContent.slice(0, 8-numbersOnScreen);
    }
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
    let numbersOnScreen = output.textContent.match(/\d/g) === null ? 0 : output.textContent.match(/\d/g).length;
    if (numbersOnScreen < 8)
        output.textContent += numText;
}

function appendDecimal() {
    if (nextClear) {
        clearScreen();
        nextClear = false;
        onFunction = false;
    }
    if (!document.getElementById("output").textContent.includes('.')) {
        output.textContent += this.textContent;
    }
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
    let decbutton = document.getElementById("decimal");
    decbutton.addEventListener("click", appendDecimal);
}

addButtonListeners();