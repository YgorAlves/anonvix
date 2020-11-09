import React from 'react';

import { Container, Room, RoomTitle } from './styles';

const Sidebar: React.FC = () => {

  const selectRoom = (event: any) => {
    console.log(event)
  }

  return (
    <Container>

      <Room onClick={selectRoom}>
        <RoomTitle>
          <span>Room 1</span>
        </RoomTitle>
      </Room>

      <Room onClick={selectRoom}>
        <RoomTitle>
          <span>Room 2</span>
        </RoomTitle>
      </Room>

    </Container>
  );
}

export default Sidebar;
