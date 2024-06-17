let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = 'O'
const X_TEXT = 'X'

let currentPlayer = X_TEXT
let gameOver = false

let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if (!gameOver && !spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer;
        checkFilled()

        if (gameOver == true && playerHasWon() === false){
            playerText.innerHTML = 'Draw!'
            return
        }

        if (playerHasWon() !== false){
            gameOver = true
            playerText.innerText = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningCombos){
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b]) && (spaces[b] == spaces[c])){
            return [a, b, c]
        }
    }
    return false
}

function checkFilled(){
    for (let i = 0; i < 9; i++){
        if (spaces[i] == null){
            return
        }
    }
    gameOver = true
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerText = 'Tic Tac Toe'
    currentPlayer = X_TEXT
    gameOver = false
}

startGame()