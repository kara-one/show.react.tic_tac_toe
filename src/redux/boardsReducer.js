import {
    ADD_HISTORY_BOARD,
    GET_HISTORY_STEP,
    RESET_HISTORY_BOARD,
    RESET_SCORE,
} from './types';
import {
    checkIsDraw,
    getStartBoard,
    getStartScore,
    getWinnerKeys,
} from '../libs/LibBoards';

const initState = {
    historyBoard: [getStartBoard()],
    currentBoard: getStartBoard(),
    firstPlayer: 'X',
    score: getStartScore(),
};

export const boardsReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_HISTORY_BOARD:
            const cellID = parseInt(action.payload);
            const currentBoard = state.currentBoard;

            if (
                currentBoard.winnerKeys.length > 0 ||
                currentBoard.cells[cellID]
            ) {
                return state;
            }

            const cells = currentBoard.cells.slice();
            const step = currentBoard.step + 1;
            const currentPlayer = currentBoard.nextPlayer;
            const nextPlayer = currentBoard.currentPlayer;

            cells[cellID] = currentPlayer;

            const newBoard = {
                cells,
                step,
                currentPlayer,
                nextPlayer,
                winnerKeys: getWinnerKeys(cells),
                isDraw: checkIsDraw(cells),
            };

            const sliceHistoryBoard = state.historyBoard.slice(0, step);

            return {
                ...state,
                historyBoard: sliceHistoryBoard.concat([newBoard]),
                currentBoard: newBoard,
            };
        case RESET_HISTORY_BOARD:
            const stateCurrentBoard = state.currentBoard;
            const score = Object.assign({}, state.score);
            const startBoard = getStartBoard();

            if (stateCurrentBoard.winnerKeys.length > 0) {
                if (stateCurrentBoard.currentPlayer === 'X') {
                    score.x = score.x + 1;
                } else {
                    score.o = score.o + 1;
                    startBoard.currentPlayer = 'X';
                    startBoard.nextPlayer = 'O';
                }
            }

            return {
                ...state,
                score,
                historyBoard: [startBoard],
                currentBoard: startBoard,
            };
        case RESET_SCORE:
            return {
                ...state,
                score: getStartScore(),
            };
        case GET_HISTORY_STEP:
            const stepID = parseInt(action.payload);

            return {
                ...state,
                currentBoard: state.historyBoard[stepID],
            };
        default:
            return state;
    }
};
