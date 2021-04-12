import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  margin: 0 1rem;
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

export default function Information({ winner, player, onClick }) {
  return (
    <>
      <Heading>五子棋 Gomoku</Heading>
      <Info>
        {winner && (
          <Status>Winner is {winner === 'black' ? '黑子' : '白子'}</Status>
        )}
        {!winner && <Status>Player: {player ? '黑子' : '白子'}</Status>}
        <Button onClick={() => onClick()}>再玩一次</Button>
      </Info>
    </>
  );
}

Information.propTypes = {
  winner: PropTypes.string,
  player: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
