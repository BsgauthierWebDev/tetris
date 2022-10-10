document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10;

    // The Pieces
    const lPiece = [
        [1, width + 1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const sPiece = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const zPiece = [
        [width, width+1, width*2+1, width*2+2],
        [2, width+1, width+2, width*2+1],
        [width, width+1, width*2+1, width*2+2],
        [2, width+1, width+2, width*2+1]
    ]

    const tPiece = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const squarePiece = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iPiece = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const thePieces = [lPiece, sPiece, zPiece, tPiece, squarePiece, iPiece];

    let currentPosition = 4;
    let currentRotation = 0;

    // Randomly select a piece and its first rotation
    let random = Math.floor(Math.random()*thePieces.length);
    let current = thePieces[random][currentRotation];

    // Draw the Piece

function drawPiece() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('piece')
    })
}

// Delete the Piece
function deletePiece() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('piece')
    })
}





})