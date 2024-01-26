import styled from 'styled-components/macro';
import { Layout as LayoutLibrary } from 'antd';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${getColor('blue')};
  position: relative;
`;

export const SLayoutInner = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  width: 100%;
  z-index: 1;
  padding: 40px 5px 0 5px;
  background: ${getColor('cream70')};
  border-radius: 25px 25px 0 0;
  overflow-y: auto;
  overscroll-behavior: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;

export const SLayoutContent = styled(LayoutLibrary.Content)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${getColor('cream70')};
`;
