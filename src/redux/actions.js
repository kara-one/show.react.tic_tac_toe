import {
    ADD_HISTORY_BOARD,
    HISTORY,
    IS_ASCENDING,
    SET_X_IS_NEXT,
    STEP_NUMBER,
    X_IS_NEXT,
} from './types';

export function historyAdd(payload) {
    return {
        type: HISTORY,
        payload,
    };
}
export function changeIsAscending() {
    return {
        type: IS_ASCENDING,
    };
}
export function changeStepNumber(payload) {
    return {
        type: STEP_NUMBER,
        payload,
    };
}
export function changeXIsNext() {
    return {
        type: X_IS_NEXT,
    };
}
export function setXIsNext(payload) {
    return {
        type: SET_X_IS_NEXT,
        payload,
    };
}
export function addHistoryBoard(payload) {
    return {
        type: ADD_HISTORY_BOARD,
        payload,
    };
}
