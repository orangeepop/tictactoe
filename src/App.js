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

export default function Board() {
  const [isXNext, setIsXNext] = useState(true); 
  const [square, setSquare] = useState(Array(9).fill(null));

  let status
  const winner = calculateWinner(square);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? "X" : "O");
  }

  function click(i) {
    if (square[i] || calculateWinner(square)) return;

    const copiedSquares = square.slice();
    if (isXNext) {
      copiedSquares[i] = 'X';
    } else {
      copiedSquares[i] = 'O';
    }
    setSquare(copiedSquares);
    setIsXNext(!isXNext);
    console.log(calculateWinner(square));
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