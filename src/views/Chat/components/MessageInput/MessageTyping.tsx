import React, { FC } from 'react';

import { Container, Ball } from './MessagesTyping.styles';

export const MessageTyping: FC = () => (
  <Container>
    <Ball className="ball-one" />
    <Ball className="ball-two" />
    <Ball className="ball-three" />
  </Container>
);
