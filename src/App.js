import './styles/App.css';

import {
    addHistoryBoard,
    changeIsAscending,
    changeStepNumber,
    changeXIsNext,
    historyAdd,
    setXIsNext,
} from './redux/actions';
import { calcStatus, getStatusMessage } from './libs/LibBoards';

import Board from './components/Boards/Board';
import History from './components/History/History';
import React from 'react';
import { connect } from 'react-redux';

const App = ({
    changeIsAscending,
    addHistoryBoard,
    changeStepNumber,
    changeXIsNext,
    historyAdd,
    setXIsNext,
    stateHistory,
    stateStepNumber,
    stateIsAscending,
    stateXIsNext,
    currentBoard,
    historyBoard,
}) => {
    const handleClick = (i) => {
        const history = stateHistory.slice(0, stateStepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calcStatus(squares).winner || squares[i]) {
            return;
        }

        squares[i] = stateXIsNext ? 'X' : 'O';

        historyAdd({
            squares: squares,
            // Store the index of the latest moved square
            latestMoveSquare: i,
        });
        changeStepNumber(history.length);
        changeXIsNext();
        addHistoryBoard(i);
    };

    const history = stateHistory;
    const stepNumber = stateStepNumber;
    const current = history[stepNumber];
    const winInfo = calcStatus(current.squares);
    const winner = winInfo.winner;

    let status = getStatusMessage(currentBoard);

    return (
        <section>
            <header className="header">
                <h1>React Tic Tac Toe</h1>
            </header>

            <div className="wrapper">
                <aside className="sidebar">
                    <History />
                </aside>

                <section className="main">
                    <h1>{status}</h1>

                    <Board
                        squares={current.squares}
                        onClick={(i) => handleClick(i)}
                        winLine={winInfo.line}
                    />
                </section>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    console.log('state: ', state);
    return {
        stateHistory: state.boards.history,
        stateStepNumber: state.boards.stepNumber,
        stateIsAscending: state.boards.isAscending,
        stateXIsNext: state.boards.xIsNext,
        currentBoard: state.boards.currentBoard,
        historyBoard: state.boards.historyBoard,
    };
};

const mapDispatchToProps = {
    changeIsAscending,
    addHistoryBoard,
    changeStepNumber,
    changeXIsNext,
    historyAdd,
    setXIsNext,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
