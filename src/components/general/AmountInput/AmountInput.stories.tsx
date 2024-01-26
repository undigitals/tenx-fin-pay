/* eslint-disable import/no-default-export */
import React from 'react';
import styled from 'styled-components';
import { AmountInputComponent } from './AmountInputComponent';

export default {
  title: 'AmountInput',
  component: AmountInputComponent,
};

const SWrapper = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  input[inputmode='decimal'] {
    border-color: green;
  }
`;

export const WithPrefix = {
  render: () => (
    <SWrapper>
      <AmountInputComponent />
    </SWrapper>
  ),
};

export const NoPrefix = {
  render: () => (
    <SWrapper>
      <AmountInputComponent noPrefix />
    </SWrapper>
  ),
};
