import styled, { css } from 'styled-components';
import { getColor, ifProp } from 'utils/helpers/styleHelpers';
import { IOutline } from './BankAccountSmall.types';

const SelectedStyles = css`
  border: 2px solid ${getColor('blue')};
  border-radius: 22px;
`;

export const SOutline = styled.div<IOutline>`
  padding: 1.5px;
  ${ifProp('isSelected', SelectedStyles)};
`;

export const SCard = styled.div`
  width: 210px;
  height: 128px;
  border-radius: 20px;
  background-color: #d1e2e3;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  padding: 13px 11px;
  cursor: pointer;
`;
