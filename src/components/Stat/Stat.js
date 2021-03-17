import './Stat.css';

import { resetHistoryBoard, resetScore } from '../../redux/actions';

import React from 'react';
import { connect } from 'react-redux';

function Stat({ resetHistoryBoard, resetScore, score }) {
    return (
        <div className="stat">
            <h2>Score:</h2>
            <ul className="scores">
                <li>
                    <div className="head">Player X</div>
                    <div className="value">{score.x}</div>
                </li>
                <li>
                    <div className="head">Player O</div>
                    <div className="value">{score.o}</div>
                </li>
            </ul>

            <div className="buttons-wrapper">
                <button onClick={() => resetScore()}>Reset score</button>
                <button onClick={() => resetHistoryBoard()}>New round</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    score: state.boards.score,
});
const mapDispatchToProps = { resetHistoryBoard, resetScore };

export default connect(mapStateToProps, mapDispatchToProps)(Stat);
