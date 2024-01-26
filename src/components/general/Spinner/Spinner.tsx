import React from 'react';
import { Spin } from 'antd';
import * as S from './Spinner.styles';

export const Spinner: React.FC = () => (
  <S.Container>
    <Spin size="large" />
  </S.Container>
);
