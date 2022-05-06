let currSymbol = 'X'
let turnCounter = 0
let lines = {
    row1: ['box1', 'box2', 'box3'],
    row2: ['box4', 'box5', 'box6'],
    row3: ['box7', 'box8', 'box9'],
    col1: ['box1', 'box4', 'box7'],
    col2: ['box2', 'box5', 'box8'],
    col3: ['box3', 'box6', 'box9'],
    diag1: ['box1', 'box5', 'box9'],
    diag2: ['box3', 'box5', 'box7']
}
let isOver = false

document.querySelectorAll(".box").forEach((item) => {
    item.addEventListener("click", addSymbolAndDisable)
})

document.querySelector('button').addEventListener("click", resetGame)

function addSymbolAndDisable(e) {
    e.target.innerHTML += `<p>${currSymbol}</P>`
    e.target.removeEventListener("click", addSymbolAndDisable)
    turnCounter += 1
    toggleCurrSymbol()
    checkLines()
}

function toggleCurrSymbol() {
    if (currSymbol === 'X') {
        currSymbol = 'O'
    } else if (currSymbol === 'O') {
        currSymbol = 'X'
    }
}

function checkLines() {
    if (turnCounter >= 5) {
        if (isOver === false) {
            checkLine(lines.row1)
            checkLine(lines.row2)
            checkLine(lines.row3)
            checkLine(lines.col1)
            checkLine(lines.col2)
            checkLine(lines.col3)
            checkLine(lines.diag1)
            checkLine(lines.diag2)
        }
    }
}

function checkLine(line) {
    let lineContent = []
    line.forEach((item) => {
        if (document.querySelector(`#${item}`).firstChild !== null) {
            let boxContent = document.querySelector(`#${item}`).firstChild.textContent
            lineContent.push(boxContent)
            let xOcurrance = lineContent.filter((item) => {
                return item == 'X' 
            }).length
            let oOcurrance = lineContent.filter((item) => {
                return item == 'O' 
            }).length
            if (xOcurrance === 3) {
                return win('X', line)
            }
            if (oOcurrance === 3) {
                return win('O', line)
            }
        }
    })
}

function win(player, line) {
    isOver = true
    line.forEach(element => {
        document.querySelector(`#${element}`).classList.add('winClass')
    });
    document.querySelectorAll(".box").forEach((item) => {
        item.removeEventListener("click", addSymbolAndDisable)
    })
    document.querySelector('#message').innerHTML = `<p>"${player}" player wins!</p>`
    document.querySelector('#message').firstChild.classList.add('message')
}

function resetGame() {
    console.log('bye');
    currSymbol = 'X'
    turnCounter = 0
    isOver = false
    document.querySelector('#message').innerHTML = null
    document.querySelectorAll(".box").forEach((item) => {
        item.innerHTML = null
        item.classList.remove('winClass')
    })
    document.querySelectorAll(".box").forEach((item) => {
        item.addEventListener("click", addSymbolAndDisable)
    })
}
