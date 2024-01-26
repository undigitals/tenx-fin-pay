import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';

export const SContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
`;

export const SDiv = styled.div`
  position: relative;
  width: 100%;
`;

export const SCloseIcon = styled(Icon)`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 10;
`;
