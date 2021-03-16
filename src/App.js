import './styles/App.css';

import React, { useState } from 'react';

import Board from './components/Board';
import { calcStatus } from './libs/LibBoards';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            xIsNext: true,
            isAscending: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calcStatus(squares).winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    // Store the index of the latest moved square
                    latestMoveSquare: i,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    handleSortToggle() {
        this.setState({
            isAscending: !this.state.isAscending,
        });
    }

    render() {
        const history = this.state.history;
        const stepNumber = this.state.stepNumber;
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
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            if (winInfo.isDraw) {
                status = 'Draw';
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }

        const isAscending = this.state.isAscending;
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
                        <button onClick={() => this.handleSortToggle()}>
                            {isAscending ? 'descending' : 'ascending'}
                        </button>
                        <ol>{moves}</ol>
                    </aside>

                    <section className="main">
                        <h1>{status}</h1>
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            winLine={winInfo.line}
                        />
                    </section>
                </div>
            </section>
        );
    }
}

export default App;
