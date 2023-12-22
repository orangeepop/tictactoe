import { useState } from 'react';

function Square({ value, handleClick}) {
  return <button className="square" onClick={handleClick}>{value}</button>;
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2], //top row
    [3,4,5], //middle row
    [6,7,8], //bottom row
    [0,3,6], //left column
    [1,4,7], //middle column
    [2,5,8], //right column
    [0,4,8], //diagonal
    [2,4,6] //diagonal
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function Board({ isXNext, square, onPlay}) {
  function click(i) {
    if (square[i] || calculateWinner(square)) return;

    const copiedSquares = square.slice();
    if (isXNext) {
      copiedSquares[i] = 'X';
    } else {
      copiedSquares[i] = 'O';
    }
    onPlay(copiedSquares);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} handleClick={() => click(0)}/>
        <Square value={square[1]} handleClick={() => click(1)}/>
        <Square value={square[2]} handleClick={() => click(2)}/>
      </div>
      <div className="board-row">
        <Square value={square[3]} handleClick={() => click(3)}/>
        <Square value={square[4]} handleClick={() => click(4)}/>
        <Square value={square[5]} handleClick={() => click(5)}/>
      </div>
      <div className="board-row">
        <Square value={square[6]} handleClick={() => click(6)}/>
        <Square value={square[7]} handleClick={() => click(7)}/>
        <Square value={square[8]} handleClick={() => click(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
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
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  
  return (
    <>
    <div className="game">
      <div className="game-board">
        <Board isXNext={isXNext} square={currentSquares} onPlay={handlePlay}/>
      </div>
    </div>
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
    </>
  );
}