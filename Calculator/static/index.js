TypeList = ['addition', 'substract', 'multiply', 'divide'];

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#calculate').onclick = () => {
        Calculate();
    }
})

function Calculate() {
    n1 = parseFloat(document.querySelector('#n1').value);
    n2 = parseFloat(document.querySelector('#n2').value);
    type = document.querySelector('#type').value;

    // check for correct inputs type
    check = false;

    // check for type
    for (i = 0; i < TypeList.length; i++)
    {
        if (TypeList[i] == type)
        {
            check = true;
        }
    }

    // check for numbers
    if (isNaN(n1) || isNaN(n2))
    {
        check = false;
    }

    if (!check)
    {
        document.querySelector("#wrong").style.display = 'block';
        document.querySelector('#result').style.display = 'none';
        return;
    }
    else
    {
        document.querySelector("#wrong").style.display = 'none';
    }
    
    // find result
    if (type == "addition")
    {
        result = n1 + n2;
    }
    else if (type == "substract")
    {
        result = n1 - n2;
    }
    else if (type == "divide")
    {
        result = n1 / n2;
    }
    else if (type == "multiply")
    {
        result = n1 * n2;
    }

    // display result
    showResult = document.querySelector('#result');
    showResult.style.display = 'block';
    showResult.innerHTML = `Result: ${result}`;
}