import { boardsReducer } from './boardsReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    boards: boardsReducer,
});
