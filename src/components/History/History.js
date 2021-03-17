import './History.css';

import React from 'react';
import { connect } from 'react-redux';
import { getHistoryStep } from '../../redux/actions';

function History({ historyBoard, currentBoard, getHistoryStep }) {
    const items = historyBoard.map((item) => {
        const player = !item.step
            ? 'Stert game'
            : `Player ${item.currentPlayer}`;

        return (
            <li key={item.step}>
                <button
                    className={
                        item.step === currentBoard.step ? 'selected' : ''
                    }
                    onClick={() => getHistoryStep(item.step)}
                >
                    Step {item.step}: {player}
                </button>
            </li>
        );
    });
    return (
        <>
            <h2>Round history:</h2>
            <ul className="history-list">{items}</ul>
        </>
    );
}

const mapStateToProps = (state) => ({
    currentBoard: state.boards.currentBoard,
    historyBoard: state.boards.historyBoard,
});
const mapDispatchToProps = {
    getHistoryStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
