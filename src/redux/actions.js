import {
    ADD_HISTORY_BOARD,
    GET_HISTORY_STEP,
    RESET_HISTORY_BOARD,
    RESET_SCORE,
} from './types';

export function addHistoryBoard(payload) {
    return {
        type: ADD_HISTORY_BOARD,
        payload,
    };
}
export function resetHistoryBoard() {
    return {
        type: RESET_HISTORY_BOARD,
    };
}
export function resetScore() {
    return {
        type: RESET_SCORE,
    };
}
export function getHistoryStep(payload) {
    return {
        type: GET_HISTORY_STEP,
        payload,
    };
}
