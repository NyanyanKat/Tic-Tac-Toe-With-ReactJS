import { throws } from 'assert';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   }
//   // }
//     render() {
//       return (
//         <button className="square" onClick={()=> this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

function Square(props) {

  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )

}
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      // const squares = [...this.state.squares]

      // For object copy: 
      // var player = {score: 1, name:'Jef'}
      // var newPlayer = Object.assign({}, player, {score:2})
      // var newPlayer = {...player, score: 2}

      squares[i] = this.state.xIsNext ? 'X':'O';
      this.setState({squares: squares,
                    xIsNext: !this.state.xIsNext,
      });
    }
    renderSquare(i) {
      return <Square value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
      />;
    }
  
    render() {
      //const status = 'Next player: ' + (this.state.xIsNext? 'X':'0');
      const winner = calculateWinner(this.state.squares);
      let status;
      //var final = setTimeout(() => alert(status), 500);
      if (winner) {
        status = 'Winner: ' + winner;
        setTimeout(() => alert(status), 500);

      // } else if (!this.state.squares.includes(null)) {
      //   status = "No winner!!!";
      // } else {
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X': '0');
      // }
      } else if (this.state.squares.includes(null)) {
        status = 'Next player: ' + (this.state.xIsNext ? 'X': '0');
      } else { status = "";
            setTimeout(() => alert(status), 500);
      }


      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  