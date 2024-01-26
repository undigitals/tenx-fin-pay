import styled from 'styled-components/macro';
import { transparentize } from 'polished';
import { ifProp, getColor } from 'utils/helpers/styleHelpers';
import { ISLoader } from './Loader.types';

export const SLoader = styled.div<ISLoader>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${ifProp('noPadding', '0', '102.4px 0')};
  background: ${(props) => transparentize(0.4, getColor('white')(props) as string)};

  .ant-spin {
    color: ${({ color, theme }) => theme[color]} !important;

    &-dot-item {
      background-color: ${({ color, theme }) => theme[color]} !important;
    }

    &-text {
      color: ${({ color, theme }) => theme[color]} !important;
    }
  }
`;
