import styled from 'styled-components/macro';
import { Layout as LayoutLibrary } from 'antd';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled(LayoutLibrary)`
  overflow: hidden;
  background: ${getColor('white')};
`;

export const SLayoutContent = styled(LayoutLibrary.Content)`
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
  z-index: 1;

  background: ${getColor('blue')};
`;

export const SLayoutWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  background: ${getColor('white')};
  border-radius: 25px 25px 0 0;
  padding-top: 25px;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
