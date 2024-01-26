import styled from 'styled-components/macro';
import { Layout as LayoutLibrary } from 'antd';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled(LayoutLibrary)`
  height: 100%;
  background: ${getColor('cream70')};
  position: relative;
  overflow: auto;
  display: flex;

  &:before {
    content: '';
    width: 23.7rem;
    height: 25.5rem;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const SLayoutInner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: stretch;
  width: 100%;
  padding: 0 25px 0;
  background: transparent;
  border-radius: 25px 25px 0 0;
`;

export const SLayoutContent = styled(LayoutLibrary.Content)`
  display: flex;
  flex: 1 1 auto;
  align-items: stretch;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

export const SExtendedLayout = styled.div`
  background: ${getColor('cream70')};
  margin-top: -130px;
  height: 200px;
`;
