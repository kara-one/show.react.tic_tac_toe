import './styles/App.css';

import Board from './components/Boards/Board';
import History from './components/History/History';
import React from 'react';
import { connect } from 'react-redux';
import { getStatusMessage } from './libs/LibBoards';

const App = ({ currentBoard }) => {
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

                    <Board />
                </section>
            </div>
        </section>
    );
};

// const mapStateToProps = (state) => ({
//     currentBoard: state.boards.currentBoard,
// });
const mapStateToProps = (state) => {
    console.log('state: ', state);
    return {
        currentBoard: state.boards.currentBoard,
    };
};

export default connect(mapStateToProps, null)(App);
