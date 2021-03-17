import {
    ADD_HISTORY_BOARD,
    GET_HISTORY_STEP,
} from './types';

export function addHistoryBoard(payload) {
    return {
        type: ADD_HISTORY_BOARD,
        payload,
    };
}
export function getHistoryStep(payload) {
    return {
        type: GET_HISTORY_STEP,
        payload,
    };
}
