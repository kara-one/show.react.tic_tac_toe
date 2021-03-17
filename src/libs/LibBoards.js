export function calcStatus(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return {
                winner: squares[a],
                line: lines[i],
                isDraw: false,
                message: 'Winner: ' + squares[a],
            };
        }
    }

    // let isDraw = true;
    // for (let i = 0; i < squares.length; i++) {
    //     if (squares[i] === null) {
    //         isDraw = false;
    //         break;
    //     }
    // }
    // console.dir(squares);
    const isDraw = !squares.includes(null);

    return {
        winner: null,
        line: null,
        isDraw: isDraw,
        message: isDraw ? 'Draw' : 'Next player: ',
    };
}

export function getStartSquares() {
    return Array(9).fill(null);
}

/** NEW */
export function getStartBoard() {
    return {
        cells: Array(9).fill(null),
        step: 0,
        currentPlayer: 'O',
        nextPlayer: 'X',
        isWinner: false,
        isDraw: false,
    };
}

export function getNextPlayer(oldPlayer) {
    return oldPlayer === 'X' ? 'O' : 'X';
}

export function checkIsWinner(cells) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }

    return false;
}

export function checkIsDraw(cells) {
    return !cells.includes(null);
}

export function getStatusMessage(currentBoard) {
    if (currentBoard.isWinner) {
        return `Winner: ${currentBoard.currentPlayer}`;
    }

    if (currentBoard.isDraw) {
        return 'Draw';
    }

    return `Next player: ${currentBoard.nextPlayer}`;
}
