document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue',
        'yellow'
    ]

    // The Pieces
    const lPiece = [
        [1, width + 1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const sPiece = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ];

    const zPiece = [
        [width, width+1, width*2+1, width*2+2],
        [2, width+1, width+2, width*2+1],
        [width, width+1, width*2+1, width*2+2],
        [2, width+1, width+2, width*2+1]
    ];

    const tPiece = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ];

    const squarePiece = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];

    const iPiece = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const thePieces = [lPiece, sPiece, zPiece, tPiece, squarePiece, iPiece];

    let currentPosition = 4;
    let currentRotation = 0;

    // Randomly select a piece and its first rotation
    let random = Math.floor(Math.random()*thePieces.length);
    let current = thePieces[random][currentRotation];

    // Draw the Piece

function drawPiece() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('piece');
        squares[currentPosition + index].style.backgroundColor = colors[random];
    })
};

// Delete the Piece
function deletePiece() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('piece');
        squares[currentPosition + index].style.backgroundColor = '';
    })
};

// Move piece down game board every second
// timerId = setInterval(moveDown, 1000);

// Assign function to key codes
function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 65) {
        rotateLeft();
    } else if (e.keyCode === 83) {
        rotateRight();
    } else if (e.keyCode=== 39) {
        moveRight();
    } else if (e.keyCode === 40) {
        moveDown();
    }
}
document.addEventListener('keyup', control);

// Move down function
function moveDown() {
    deletePiece();
    currentPosition += width;
    drawPiece();
    freezePiece();
};

// Freeze function
function freezePiece() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'));
        // Start a new piece on the board
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * thePieces.length);
        current = thePieces[random][currentRotation];
        currentPosition = 4;
        drawPiece();
        displayShape();
        addScore();
        gameOver();
    }
};

// Move piece left unless hit the edge or hit another piece
function moveLeft() {
    deletePiece();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    if(!isAtLeftEdge) currentPosition -= 1;

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1;
    }

    drawPiece();
}

// Move piece right unless hit the edge or hit another piece
function moveRight() {
    deletePiece();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

    if (!isAtRightEdge) currentPosition += 1;

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1;
    }

    drawPiece();
}

// Rotate the current piece
function rotateLeft() {
    deletePiece();
    if (currentRotation === 0) {
        // If current rotation is in the 1st position, move to the 4th position
        currentRotation = 3;
    } else currentRotation --;
    current = thePieces[random][currentRotation]
    drawPiece();
}

function rotateRight() {
    deletePiece();
    currentRotation ++;
    if (currentRotation === current.length) {
        // If current rotation is in the 4th position, revert to the 1st position
        currentRotation = 0;

    }
    current = thePieces[random][currentRotation]
    drawPiece();
}

// Show "Next Piece" in mini grid
const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
const displayIndex = 0;

// Array of pieces in their first position
const upNextPiece = [
    // L Piece
    [1, displayWidth + 1, displayWidth*2+1, 2],
    // S Piece
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    // Z Piece
    [displayWidth, displayWidth+1, displayWidth*2+1, displayWidth*2+2],
    // T Piece
    [1, displayWidth, displayWidth+1, displayWidth+2],
    // Square Piece
    [0, 1, displayWidth, displayWidth+1],
    // I Piece
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1],
]

// Display the shape in the mini-grid display
function displayShape() {
    // Remove any trace of a piece from the entire grid
    displaySquares.forEach(square => {
        square.classList.remove('piece');
        square.style.backgroundColor = '';
    })
    upNextPiece[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('piece');
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
    })
}

// Add functionality to the Start/Pause button
startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        drawPiece();
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random()*thePieces.length);
        displayShape();
    }
})

// Add Score
function addScore() {
    for (let i = 0; i < 199; i+= width) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

        if (row.every(index => squares[index].classList.contains('taken'))) {
            score += 10;
            scoreDisplay.innerHTML = score;
            row.forEach(index => {
                squares[index].classList.remove('taken');
                squares[index].classList.remove('piece');
                squares[index].style.backgroundColor = '';
            })
            const squaresRemoved = squares.splice(i, width);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
        }
    }
}

// Game Over
function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end';
        clearInterval(timerId);
    }
}





















})