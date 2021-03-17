import './Board.css';

import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
        const winLine = this.props.winLine;
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                highlight={winLine && winLine.includes(i)}
            />
        );
    }

    render() {
        const boardSize = 9;
        let squares = [];
        for (let i = 0; i < boardSize; i++) {
            squares.push(this.renderSquare(i))
        }

        return <div className="board">{squares}</div>;
    }
}

export default Board;
