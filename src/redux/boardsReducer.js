import {
    ADD_HISTORY_BOARD,
    GET_HISTORY_STEP,
} from './types';
import {
    checkIsDraw,
    getStartBoard,
    getWinnerKeys,
} from '../libs/LibBoards';

const initState = {
    historyBoard: [getStartBoard()],
    currentBoard: getStartBoard(),
    firstPlayer: 'X',
};

export const boardsReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_HISTORY_BOARD:
            const cellID = parseInt(action.payload);
            const currentBoard = state.currentBoard;

            if (currentBoard.winnerKeys.length > 0 || currentBoard.cells[cellID]) {
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
