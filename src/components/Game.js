import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move)=> {
            const desc = move ? "Go to turn " + move : "Start game";
            return (
                <li key={move}> 
                    <button onClick={()=>{this.jumpTo(move)}}>
                        {desc}
                    </button>
                </li>

            );
        });
        let status = winner ? winner + " wins!" : (this.state.xIsNext ? "X" : "O") + "'s turn";
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i)=> this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const winningValues = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningValues.length; i++) {
        const[a, b, c] = winningValues[i];
        if (squares[a] && squares[b] && squares[c] 
            && squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[a];
        }
    }
    return null;
}
