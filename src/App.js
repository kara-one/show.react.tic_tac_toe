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

import Board from './components/Board';
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

    const jumpTo = (step) => {
        setXIsNext(step % 2 === 0);
        changeStepNumber(step);
    };

    const handleSortToggle = () => {
        changeIsAscending();
    };

    const history = stateHistory;
    const stepNumber = stateStepNumber;
    const current = history[stepNumber];
    const winInfo = calcStatus(current.squares);
    const winner = winInfo.winner;

    let moves = history.map((step, move) => {
        const latestMoveSquare = step.latestMoveSquare;
        const col = 1 + (latestMoveSquare % 3);
        const row = 1 + Math.floor(latestMoveSquare / 3);
        const desc = move
            ? `Go to move #${move} (${col}, ${row})`
            : 'Go to game start';

        return (
            <li key={move}>
                {/* Bold the currently selected item */}
                <button
                    className={
                        move === stepNumber ? 'move-list-item-selected' : ''
                    }
                    onClick={() => jumpTo(move)}
                >
                    {desc}
                </button>
            </li>
        );
    });

    let status = getStatusMessage(currentBoard);

    const isAscending = stateIsAscending;
    if (!isAscending) {
        moves.reverse();
    }

    return (
        <section>
            <header className="header">
                <h1>React Tic Tac Toe</h1>
            </header>

            <div className="wrapper">
                <aside className="sidebar">
                    <button onClick={() => handleSortToggle()}>
                        {isAscending ? 'descending' : 'ascending'}
                    </button>
                    <ol>{moves}</ol>
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
