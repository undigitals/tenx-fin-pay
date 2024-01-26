import { Icon } from 'components/general/Icon/Icon';
import { CustomText } from 'components/theme/CustomText/CustomText';
import styled from 'styled-components';

export const SContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: scroll;
  height: calc(100vh - 200px);
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SCustomText = styled(CustomText)`
  position: relative;
  width: 100%;
`;

export const SCloseIcon = styled(Icon)`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 10;
`;
