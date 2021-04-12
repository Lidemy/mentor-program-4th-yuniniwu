import styled from 'styled-components';
import Board from './components/Board';
import Information from './components/Information';
import useGomoku from './useGomoku';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bg_card};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-bottom: 8rem;
`;

export default function Gomoku() {
  const {
    board,
    playerIsBlack,
    winner,
    handleClick,
    handleRestart,
  } = useGomoku();

  return (
    <Container>
      <Information
        winner={winner}
        player={playerIsBlack}
        onClick={handleRestart}
      />
      <Board squares={board.current} onClick={handleClick} />
    </Container>
  );
}
