import styled from 'styled-components';
import Square from './Square';

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

export default function Board({ squares, onClick }) {
  return (
    <BoardOutline>
      {squares.map((row, y) => (
        <Row key={y}>
          {/* why */}
          {row.map((_, x) => (
            <Square
              key={x}
              value={squares[y][x]}
              onClick={() => onClick(x, y)}
            />
          ))}
        </Row>
      ))}
    </BoardOutline>
  );
}
