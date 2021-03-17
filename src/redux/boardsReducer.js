import {
    ADD_HISTORY_BOARD,
    GET_HISTORY_STEP,
    HISTORY,
    IS_ASCENDING,
    SET_X_IS_NEXT,
    STEP_NUMBER,
    X_IS_NEXT,
} from './types';
import {
    checkIsDraw,
    checkIsWinner,
    getNextPlayer,
    getStartBoard,
    getStartSquares,
} from '../libs/LibBoards';

const initState = {
    history: [
        {
            squares: getStartSquares(),
        },
    ],
    stepNumber: 0,
    xIsNext: true,
    isAscending: true,

    historyBoard: [getStartBoard()],
    currentBoard: getStartBoard(),
    firstPlayer: 'X',
};

export const boardsReducer = (state = initState, action) => {
    switch (action.type) {
        case HISTORY:
            const history = state.history.slice(0, state.stepNumber + 1);

            return {
                ...state,
                history: history.concat(action.payload),
            };
        case STEP_NUMBER:
            return {
                ...state,
                stepNumber: action.payload,
            };
        case X_IS_NEXT:
            return {
                ...state,
                xIsNext: !state.xIsNext,
            };
        case SET_X_IS_NEXT:
            return {
                ...state,
                xIsNext: action.payload,
            };
        case IS_ASCENDING:
            return {
                ...state,
                isAscending: !state.isAscending,
            };
        /** NEW */
        case ADD_HISTORY_BOARD:
            const cellID = parseInt(action.payload);
            const currentBoard = state.currentBoard;

            if (currentBoard.isWinner || currentBoard.cells[cellID]) {
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
                isWinner: checkIsWinner(cells),
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
