import { useState } from 'react';

export default function useGomoku() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [playerIsBlack, setPlayerIsBlack] = useState(true);
  const [winner, setWinner] = useState(null);
  const blackOrWhite = playerIsBlack ? 'black' : 'white';

  const handleClick = (x, y) => {
    if (board[y][x] || winner) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[y][x] = blackOrWhite;
    setBoard(newBoard);
    setWinner(getWinner(newBoard, y, x));
    setPlayerIsBlack(!playerIsBlack);
  };

  // count continuation of one side
  function countTotal(board, currentY, currentX, directionY, directionX) {
    const currentPlayer = board[currentY][currentX];
    let tempX = currentX;
    let tempY = currentY;

    // quantity of continuous chess
    let total = 0;

    do {
      tempX += directionX;
      tempY += directionY;

      if (board[tempY][tempX] === currentPlayer) {
        total++;
      } else {
        break;
      }
    } while (true);

    return total;
  }

  function getWinner(board, y, x) {
    if (
      countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
      countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
      countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
      countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
    ) {
      return board[y][x];
    }
  }

  const handleRestart = () => {
    setBoard(Array(19).fill(Array(19).fill(null)));
    setPlayerIsBlack(true);
    setWinner(null);
  };

  return {
    board,
    winner,
    playerIsBlack,
    handleClick,
    handleRestart,
  };
}
