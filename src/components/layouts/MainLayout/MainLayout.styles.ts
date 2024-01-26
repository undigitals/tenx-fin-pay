import styled from 'styled-components/macro';
import { MEDIA_SIZE, getColor } from 'utils/helpers/styleHelpers';
import { TThemeColor } from 'styles/theme';

export const SLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${getColor('cream50')};

  @media screen and (max-width: ${MEDIA_SIZE.tablet - 1}px) {
    background: ${getColor('blue')};
  }
`;

export const SLayoutContent = styled.div<{ background?: TThemeColor }>`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  z-index: 1;
  background: ${({ background }) => getColor(background ?? 'cream70')};
  border-radius: 25px 25px 0 0;
  background-clip: padding-box;
  -webkit-background-clip: padding-box;
  box-sizing: border-box;
  overflow: hidden;

  @media screen and (max-width: ${MEDIA_SIZE.tablet - 1}px) {
    &.nav {
      padding-bottom: 108px;
    }
  }
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    background: ${getColor('cream50')};
  }
`;

export const SContentWrapper = styled.div<{ noContentPadding?: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${({ noContentPadding }) => (noContentPadding ? '0' : '25px 0 10px')};
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-bottom: -10px;
  overscroll-behavior-y: inherit;
`;
