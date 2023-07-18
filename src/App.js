import React, { useState } from 'react';
import './styles.css';

function Square({ value, onSquareClick }) {
  let squareColorClass = '';
  if (value === 'X') {
    squareColorClass = 'black';
  } else if (value === 'O') {
    squareColorClass = 'white';
  }

  return (
    <button className={`square ${squareColorClass}`} onClick={onSquareClick}>
      {value === 'X' && (
        <img
          className="symbol-image-dark"
          src="https://cdn11.bigcommerce.com/s-t3aq9bcqq7/images/stencil/500x659/products/1524/3645/LU162614A1-3__21722.1655237999.jpg?c=2"
          alt="X"
        />
      )}
      {value === 'O' && (
        <img
          className="symbol-image-light"
          src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Green_lightsaber_transparent.png"
          alt="O"
        />
      )}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);

    if (calculateWinner(nextSquares)) {}
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner === 'X') {
    status = 'Winner: The Dark Side has won! (We do still have cookies)';
  } else if (winner === 'O') {
    status = 'Winner: The Light has won (Sorry, no cookies)';
  } else {
    status = 'Next player: ' + (xIsNext ? 'Dark' : 'Light');
  }

  return (
    <div className="board">
      <div className={`status ${xIsNext ? 'light' : 'dark'}`}>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Start over';
    }
    return (
      <ul key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </ul>
    );
  });

  return (
    <div className={`game ${xIsNext ? 'light' : 'dark'}`}>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

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
