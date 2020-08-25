import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            squares: Array(9).fill(null)
        }
    }

    resetGame(step) {
        this.setState({
            xIsNext: true,
            squares: Array(9).fill(null)
        })
    }

    handleClick(i) {
        const squares = this.state.squares;
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            xIsNext: !this.state.xIsNext,
            squares: squares
        });
    }
    
    render() {
        const squares = this.state.squares;
        const winner = calculateWinner(squares);
        let status = winner ? winner + " wins!" : (this.state.xIsNext ? "X" : "O") + "'s turn";
        return (
            <div className="game">
                <div className="status">{status}</div>
                <div className="game-board">
                    <Board squares={squares} onClick={(i)=> this.handleClick(i)} />
                </div>
                <button className="reset-button" onClick={()=>{this.resetGame()}}>
                    Reset Game
                </button>
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
