import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ],
            p1wins: 0,
            p2wins: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem("p1wins-p2wins")) {
            let wins = localStorage.getItem("p1wins-p2wins");
            wins = wins.split("-");
            const p1wins = Number(wins[0]);
            const p2wins = Number(wins[1]);
            this.setState({ p1wins, p2wins });
		} 
    }

    componentWillUpdate() {
        
    }

    handleClick(i) {
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if(winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        let winner2 = calculateWinner(squares);
        let p1wins = this.state.p1wins;
        let p2wins = this.state.p2wins;
        if(winner2) {
            if(winner2[0] === "X") {
                p1wins += 1;
            } else {
                p2wins += 1;
            }
        }
        localStorage.setItem("p1wins-p2wins",`${p1wins}-${p2wins}`);
        this.setState({ history: history.concat({ squares }),p1wins,p2wins, xIsNext: !this.state.xIsNext,stepNumber: history.length });
    }

    startNewGame() {
        this.setState({ stepNumber: 0, xIsNext: true });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const results = calculateWinner(current.squares);
        let highlight = Array(9).fill(false);
        let winner;
        if(results) {
            winner = results[0];
            highlight[results[1][0]] = true;
            highlight[results[1][1]] = true;
            highlight[results[1][2]] = true;
        }
        const stepNumber = this.state.stepNumber;
        return (
            <div className="game">
                <div className="game-board">
                    <div className="center">
                        <h3>
                            Player 1 - X, Player 2 - O
                        </h3>
                        <p>Player 1 Wins :- {this.state.p1wins}</p>
                        <p>Player 2 Wins :- {this.state.p2wins}</p>
                    </div>
                    <Board onClick={(i) => this.handleClick(i)} 
                        squares={current.squares} highlight={highlight}  
                    />
                    <div className="center">
                    <h3>
                            { winner ? `Winner is : ${winner === "X" ? "Player 1" : "Player 2" }` : `${stepNumber === 9 ? "Its a Tie!" : `Next Move : ${this.state.xIsNext ? "Player 1" : "Player 2" }` }` }
                        </h3>
                        <button onClick={() => this.startNewGame()} className="start-btn">Start New Game</button>
                    </div>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i=0;i<lines.length;i++) {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a],lines[i]];
        }
    }
    return null;
}

export default Game;