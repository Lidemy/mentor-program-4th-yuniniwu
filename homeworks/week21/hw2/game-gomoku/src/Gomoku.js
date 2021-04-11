import styled from 'styled-components';
import { useState } from 'react';
import Board from './Board';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bg_card};
  height: 100%;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-bottom: 8rem;
`;

const Heading = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.font_main};
`;

const Info = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 30vmin;
  margin-bottom: 1rem;
`;

const Status = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.colors.font_main};
  margin: 0;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.bg_main};
  color: ${(props) => props.theme.colors.btn_main};
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0.2rem 0.2rem 0.5rem 0.2rem
    ${(props) => props.theme.colors.shadow};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.btn_main};
    color: ${(props) => props.theme.colors.bg_main};
  }

  &:focus {
    outline: 0;
  }
`;

export default function Gomoku() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [playerIsBlack, setPlayerIsBlack] = useState(true);
  const [winner, setWinner] = useState(null);
  const blackOrWhite = playerIsBlack ? 'black' : 'white';

  const handleClick = (x, y) => {
    if (board[y][x] || winner) return;
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[y][x] = blackOrWhite;
    // console.log('handleClick', newBoard[y][x]);
    setBoard(newBoard);
    // TO CHECK
    setWinner(getWinner(newBoard, y, x));
    setPlayerIsBlack(!playerIsBlack);
  };

  // count continuation of one of the player
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

  function handleRestart() {
    setBoard(Array(19).fill(Array(19).fill(null)));
    setPlayerIsBlack(true);
    setWinner(null);
  }

  return (
    <Container>
      <Heading>五子棋 Gomoku</Heading>
      <Info>
        {winner ? (
          <Status>Winner is {winner === 'black' ? '黑子' : '白子'}</Status>
        ) : (
          <Status>Player: {playerIsBlack ? '黑子' : '白子'}</Status>
        )}
        <Button onClick={handleRestart}>再玩一次</Button>
      </Info>
      <Board squares={board} onClick={handleClick} />
    </Container>
  );
}
