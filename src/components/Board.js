import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
    renderSquare(i, highlight) {
        return <Square value={this.props.squares[i]} highlight={highlight} onClick={() => this.props.onClick(i)} />
    }
    render() {
        const highlight = this.props.highlight;
        return (
            <div>
                <div className="border-row">
                    {this.renderSquare(0,highlight[0])}
                    {this.renderSquare(1,highlight[1])}
                    {this.renderSquare(2,highlight[2])}
                </div>
                <div className="border-row">
                    {this.renderSquare(3,highlight[3])}
                    {this.renderSquare(4,highlight[4])}
                    {this.renderSquare(5,highlight[5])}
                </div>
                <div className="border-row">
                    {this.renderSquare(6,highlight[6])}
                    {this.renderSquare(7,highlight[7])}
                    {this.renderSquare(8,highlight[8])}
                </div>
            </div>
        );
    }
}

export default Board;