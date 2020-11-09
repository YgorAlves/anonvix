import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 15vw;
  height: 100%;
`;

export const Room = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-content: center;
  background-color: #ff9000;

  & + div {
    margin-top: 1em;
  }
`;

export const RoomTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.8em 1em;

  span {
    margin-right: 1em;
  }


`;
