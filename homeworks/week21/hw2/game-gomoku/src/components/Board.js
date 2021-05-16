import styled from 'styled-components';
import PropTypes from 'prop-types';

const Row = styled.div`
  &:after {
    clear: both;
    content: '';
    display: table;
  }
`;

const BoardOutline = styled.div`
  background: ${(props) => props.theme.colors.bg_notice};
  box-shadow: 3px 3px 8px 3px ${(props) => props.theme.colors.shadow};
  border-radius: 10px;
  padding: 5vmin;
`;

const DefaultSquare = styled.button`
  background: ${(props) => props.theme.colors.bg_board};
  border: 1px solid #fff;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 3vmin;
  width: 4vmin;
  height: 4vmin;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;

  &:focus {
    outline: 0;
  }
`;

const Chess = styled.div`
  width: 3.6vmin;
  height: 3.6vmin;
  background: ${(props) => props.$color};
  border-radius: 50%;
  float: left;
`;

export default function Board({ squares, onClick }) {
  return (
    <BoardOutline>
      {squares.map((row, y) => (
        <Row key={y}>
          {row.map((_, x) => (
            <DefaultSquare key={x} onClick={() => onClick(x, y)}>
              {squares[y][x] && <Chess $color={squares[y][x]} />}
            </DefaultSquare>
          ))}
        </Row>
      ))}
    </BoardOutline>
  );
}

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
