//
const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
let output = document.querySelector("#output");

// when user click on an input
function handleInput() {
    numbers.forEach((num) => {
        num.addEventListener("click", () => {
            handleNumber(num.id);
        })
    });
    symbols.forEach((symbol) => {
        symbol.addEventListener("click", () => {
            handleSymbol(symbol.id);
        });
    })
}

// when user click on a number
function handleNumber(num) {
    output.innerHTML += num;
}
// when user click on a symbol
function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            output.innerHTML = "";
            return;
        case "sign":
            symbol = "(-)";
            break;
        case "Del":
            original = output.innerHTML;
            output.innerHTML = original.slice(0, original.length - 1);
            return;
        case "add":
            symbol = "+";
            break;
        case "substract":
            symbol = "-";
            break;
        case "multiply":
            symbol = "x";
            break;
        case "divide":
            symbol = "/";
            break;
        case "equal":
            calculateOutput();
            return;
    }

    output.innerHTML += symbol;
}
// calculate the output
function calculateOutput() {
    console.log("output calculated!");
    let formula = document.querySelector("#output").innerHTML;
    console.log(formula);
    
    // loop through the formula
    // handle order of x, /, +, -
    // first loop for multiplication and division
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] === "x" || formula[i] === "/") {
            // number before the sign
            let [numBefore, j] = getNumBefore(i, i, formula);
            console.log(numBefore);

            // number after the sign
            let [numAfter, k] = getNumAfter(i, i, formula);
            console.log(numAfter);

            // do calculation
            formula = Calculate(i, j, k, formula);

            console.log(formula);

            // shift i position to the left as the formula is now changed
            i = j + 1;
        }
    }

    // second loop for addition and substraction
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] === "+" || formula[i] === "-") {
            // number before the sign
            let [numBefore, j] = getNumBefore(i, i, formula);
            console.log(numBefore);

            // number after the sign
            let [numAfter, k] = getNumAfter(i, i, formula);
            console.log(numAfter);

            // do calculation
            formula = Calculate(i, j, k, formula);
            
            console.log(formula);

            // shift i position to the left as the formula is now changed
            i = j + 1;
        }
    }

    // check for negative signs

    let test = 1 / 2;
    console.log(test);

    if (isNaN(test) || test == Infinity || test == -Infinity) {
        handleSymbol("C");
        output.innerHTML += "ERROR";
    }

}

// number before the sign
function getNumBefore(i, j, formula) {
    // number before the sign
    j = i - 1;
    for (; j >= 0; j--) {
        if (formula[j] === "+" || formula[j] === "-" || formula[j] === "x" || formula[j] === "/") {
            break;
        }
    }

    let numBefore = formula.slice(j + 1, i);
    return [numBefore, j];
}
// number after the sign
function getNumAfter(i, k, formula) {
    // number after the sign
    k = i + 1;
    for (; k < formula.length; k++) {
        if (formula[k] === "+" || formula[k] === "-" || formula[k] === "x" || formula[k] === "/") {
            break;
        }
    }

    let numAfter = formula.slice(i + 1, k);
    return [numAfter, k];
}
// calculate single operation
function Calculate(i, j, k, formula) {
    switch (formula[i]) {
        case "+":
            formula = formula.slice(0, j+1) + String(parseFloat(formula.slice(j+1, i)) + parseFloat(formula.slice(i+1, k))) + formula.slice(k);
            break;
        case "-":
            formula = formula.slice(0, j+1) + String(parseFloat(formula.slice(j+1, i)) - parseFloat(formula.slice(i+1, k))) + formula.slice(k);
            break;
        case "x":
            formula = formula.slice(0, j+1) + String(formula.slice(j+1, i) * formula.slice(i+1, k)) + formula.slice(k);
            break;
        case "/":
            formula = formula.slice(0, j+1) + String(formula.slice(j+1, i) / formula.slice(i+1, k)) + formula.slice(k);
            break;
    }
    return formula;
}

handleInput();