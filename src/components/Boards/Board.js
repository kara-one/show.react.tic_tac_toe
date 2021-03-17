import './Board.css';

import React from 'react';
import Square from './Square';
import { addHistoryBoard } from '../../redux/actions';
import { connect } from 'react-redux';

function Board({ addHistoryBoard, currentBoard }) {
    let cells = [];
    for (let i = 0; i < currentBoard.cells.length; i++) {
        const item = (
            <Square
                key={i}
                value={currentBoard.cells[i]}
                onClick={() => addHistoryBoard(i)}
                highlight={currentBoard.winnerKeys.includes(i)}
            />
        );

        cells.push(item);
    }

    return <div className="board">{cells}</div>;
}

const mapStateToProps = (state) => ({
    currentBoard: state.boards.currentBoard,
});

const mapDispatchToProps = {
    addHistoryBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
