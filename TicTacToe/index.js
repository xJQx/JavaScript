const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

// 5 by 5 boxes
// 9 of these boxes
// 17 by 17 gameboard including 2 spaces for lines

let tileCount = 30; // each tile should be 30 x 30
let tileSize = tileCount - 5;
let SymbolSize = 30;
let symbolCount = 0;

// default ai game
let player2 = false;
let playerColor = 'orange';

// draw board lines
let tileLine = (canvas.width - 2 * tileCount) / 3;
for (let i = 0; i < 2; i++)
{
    position = tileLine;
    tileLine += tileLine + 1 * tileCount;
    for (let j = 0; j < canvas.width / tileCount; j++)
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(j * tileCount, position, tileSize, tileSize);
        ctx.fillRect(position, j * tileCount, tileSize, tileSize);
    }
    
}

// add event listener for clicks (when a player makes a move)
document.addEventListener('keydown', event => {
    number = event.keyCode;
    // keycode from 49 - 57
    for (let i = 49; i < 58; i++)
    {
        if (event.keyCode === i)
        {
            let number = i - 48;

            //player 1
            if (playerColor == 'orange')
            {
                // color box
                if (!colorBox(number, playerColor))
                {
                    return console.log('fail');
                }
                
                // draw symbol in board
                drawSymbol(number);
                
                symbolCount++;

                // check player 1 win
                if (winConditions('orange'))
                {
                    console.log("player 1 wins");
                    printWinner('player 1');
                    document.addEventListener('keydown', function () {
                        this.location.reload();
                    });
                    break;
                }
                isTie();
                if (player2 == true) {
                    playerColor = 'blue';
                }
            }

            // AI
            if (player2 == false)
            {
                if (symbolCount < 9) {
                    AI();
                }
            }
            else if (player2 == true && playerColor == 'blue')
            {
                // color box
                if (!colorBox(number, playerColor))
                {
                    return console.log('fail');
                }
                
                // draw cross symbol in board
                drawCross(number);
                
                symbolCount++;
                playerColor = 'orange';
            }
            
            // check player 2 win
            if (winConditions('blue'))
            {
                console.log("player 2 wins");
                printWinner('player 2');
                document.addEventListener('keydown', function () {
                    this.location.reload();
                });
                break;
            }
            if (symbolCount % 2 == 0)
            {
                document.querySelector('#warning').style.display = 'none';
            }
        }
    }
});

// color mini box
function colorBox(number, color) {
    box = document.querySelector(`#n${number}`);
    
    // check if box is already in play
    if (box.style.backgroundColor == 'blue' || box.style.backgroundColor == 'orange')
    {
        return false;
    }
    else
    {
        box.style.backgroundColor = color;
        return true;
    }
}

// draw circle symbol
function drawSymbol(number) {
    // box location
    // 0,0 6,0 12,0 0,6 6,6 12,6 01,2 6,12 12,12

    let x;
    let y;

    if (number < 4) {
        y = 0;
        x = (number - 1) * 6;
    }
    else if (number > 3 && number < 7) {
        y = 6;
        x = (number - 4) * 6;
    }
    else {
        y = 12;
        x = (number - 7) * 6;
    }

    // for each row
    for (let i = 0; i < 5; i++)
    {
        // side parts
        if (i === 0)
        {
            for (let j = 0; j < 5; j++)
            {
                if (j === 0 || j === 4)
                {
                    continue;
                }
                ctx.fillStyle = 'orange';
                ctx.fillRect((i + x) * tileCount, (j + y) * tileCount, SymbolSize, SymbolSize);
            }
            continue;
        }
        if (i === 4)
        {
            for (let j = 0; j < 5; j++)
            {
                if (j === 0 || j === 4)
                {
                    continue;
                }
                ctx.fillStyle = 'orange';
                ctx.fillRect((i + x) * tileCount, (j + y) * tileCount, SymbolSize, SymbolSize);
            }
            continue;
        }
        // top part
        ctx.fillStyle = 'orange';
        ctx.fillRect((i + x) * tileCount, y * tileCount, SymbolSize, SymbolSize);
        //btm part
        ctx.fillStyle = 'orange';
        ctx.fillRect((i + x) * tileCount, (4 + y) * tileCount, SymbolSize, SymbolSize);
    }
}

// draw cross symbol
function drawCross(number)
{
    // box location
    // 0,0 6,0 12,0 0,6 6,6 12,6 01,2 6,12 12,12
    let x;
    let y;

    if (number < 4) {
        y = 0;
        x = (number - 1) * 6;
    }
    else if (number > 3 && number < 7) {
        y = 6;
        x = (number - 4) * 6;
    }
    else {
        y = 12;
        x = (number - 7) * 6;
    }

    // draw cross
    for (let i = 0; i < 5; i++)
    {
        for (let j = i; j < i + 1; j++)
        {
            ctx.fillStyle = 'blue';
            ctx.fillRect((j + x) * SymbolSize, (i + y) * SymbolSize, tileSize, tileSize);
        }
        for (let k = i; k < i + 1; k++)
        {
            ctx.fillStyle = 'blue';
            ctx.fillRect((4 - k + x) * SymbolSize, (i + y) * SymbolSize, tileSize, tileSize);
        }
    }
}

// AI
function AI()
{
    number = Math.floor(Math.random() * 9 + 1); // random numbers from 1 - 9
    
    while (true) {
        if (colorBox(number, "blue")) {
            break;
        }
        else {
            number = Math.floor(Math.random() * 9 + 1); // random numbers from 1 - 9
        }
    }
    drawCross(number);
    symbolCount++;
}

// check win condition
function winConditions(color) {
    let numberDict = {};
    document.querySelectorAll('td').forEach(number => {
        
        numberDict[number.id] = number.style.backgroundColor;
    })

    // check for wins
    for (let i = 0; i < 3; i++)
    {
        // horizontal wins
        // 123 456 789
        h1 = i * 3 + 1;
        h2 = i * 3 + 2;
        h3 = i * 3 + 3;
        
        if (numberDict[`n${h1}`] == numberDict[`n${h2}`] && numberDict[`n${h1}`] == numberDict[`n${h3}`])
        {
            if (numberDict[`n${h1}`] == color || numberDict[`n${h1}`] == color)
            {
                console.log('horizontal!');
                return true;
            }
        }

        // vertical wins
        // 147 258 369
        v1 = i + 1;
        v2 = i + 4;
        v3 = i + 7;

        if (numberDict[`n${v1}`] == numberDict[`n${v2}`] && numberDict[`n${v1}`] == numberDict[`n${v3}`])
        {
            if (numberDict[`n${v1}`] == color || numberDict[`n${v1}`] == color)
            {
                console.log('vertical!');
                return true;
            }
        }

        // diagonal wins
        // 159 357
        if ((i + 1) != 2)
        {
            d1 = i + 1;
            d2 = i + 5 - 1 * i;
            d3 = i + 9 - 2 * i;
            
            if (numberDict[`n${d1}`] == numberDict[`n${d2}`] && numberDict[`n${d1}`] == numberDict[`n${d3}`])
            {
                if (numberDict[`n${d1}`] == color || numberDict[`n${d1}`] == color)
                {
                    console.log('diagonal!');
                    return true;
                }
            }
        }
    }

    // if no win condition met
    return false;
}

// print winner
function printWinner(player) {
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width / 6, canvas.height / 2 - 50, 320, 90);

    ctx.font = '50px Verdena';

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');
    ctx.fillStyle = gradient;

    ctx.fillText(`${player} wins!`, canvas.width / 5, canvas.height / 2)
}

// game tie
function isTie()
{
    if (symbolCount == 9)
    {
        ctx.fillStyle = 'white';
        ctx.fillRect(6 * tileCount, canvas.height / 2 - 50, 100, 60);

        ctx.font = '50px Verdena';

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');
        ctx.fillStyle = gradient;

        ctx.fillText(`Tie!`, 6 * tileCount + 10, canvas.height / 2);
    }
}

// buttons for choosing ai or 2 players mode
{
    button1 = document.querySelector('#player2');
    button2 = document.querySelector('#ai');

    button1.onclick = () => {
        button1.setAttribute('class', "btn btn-primary btn-sm");
        button2.setAttribute('class', "btn btn-outline-primary btn-sm");
        player2 = true;
    }

    button2.onclick = () => {
        if (symbolCount % 2 == 0)
        {
            button2.setAttribute('class', "btn btn-primary btn-sm");
            button1.setAttribute('class', "btn btn-outline-primary btn-sm");
            player2 = false;
        }
        else
        {
            document.querySelector('#warning').style.display = 'block';
        }
    }
}

// warning alert
function closeWarning() {
    document.querySelector('#warning').style.display = 'none';
}


// reset board
document.querySelector('#reset').onclick = () => {
    location.reload();
}