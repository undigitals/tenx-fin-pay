import { tenxLayoutLogo } from 'assets/images';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const STenxLayoutHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84px;
  background: ${getColor('blue')};

  h1 {
    height: 32px;
    margin: 0;
    text-align: center;

    a {
      display: inline-block;
      width: 192px;
      height: 100%;
      mask: url(${tenxLayoutLogo}) no-repeat 0 / contain;
      background-color: ${getColor('white')};
    }
  }
`;
