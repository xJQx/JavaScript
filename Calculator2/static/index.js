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
    let ans = 0;
    console.log(formula);
    
    // loop through the formula
    // handle order of x, /, +, -
    // first loop for multiplication and division
    for (let i = 0; i < formula.length; i++) {
        if (formula[i] === "x" || formula[i] === "/") {
            let numBefore;
            let numAfter;
            
            // number before the sign
            let j = i - 1;
            for (; j >= 0; j--) {
                if (formula[j] === "+" || formula[j] === "-") {
                    break;
                }
            }
            numBefore = formula.slice(j + 1, i);
            console.log(numBefore);

            // number after the sign
            let k = i + 1;
            for (; k < formula.length; k++) {
                if (formula[k] === "+" || formula[k] === "-") {
                    break;
                }
            }
            numAfter = formula.slice(i + 1, k);
            console.log(numAfter);
        }
    }
    // second loop for addition and substraction
    for (let i = 0; i < formula.length; i++) {
        ;
    }

    // check for negative signs

    let test = 1 / 2;
    console.log(test);

    if (isNaN(test) || test == Infinity || test == -Infinity) {
        handleSymbol("C");
        output.innerHTML += "ERROR";
    }

}

handleInput();