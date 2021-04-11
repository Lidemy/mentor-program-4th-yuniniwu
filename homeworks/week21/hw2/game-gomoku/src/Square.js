import styled from 'styled-components';

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

export default function Square({ value, onClick }) {
  return (
    <DefaultSquare onClick={onClick}>
      {value && <Chess $color={value} />}
    </DefaultSquare>
  );
}
