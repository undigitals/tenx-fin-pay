import styled, { css } from 'styled-components/macro';
import { Layout as LayoutLibrary } from 'antd';
import { getColor, ifProp, getProp, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { motion } from 'framer-motion';
import DotPatternBackground from 'assets/images/dotPatternBackground.svg';

export const SLayout = styled(LayoutLibrary)<{ altLayout?: string }>`
  min-height: 100vh;
  position: relative;

  &:before {
    content: '';
    width: 23.7rem;
    height: 25.5rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  ${({ altLayout }) => {
    if (altLayout === 'v2') {
      return css`
        background: ${getColor('cream70')} url(${DotPatternBackground}) right no-repeat;
      `;
    }

    return css`
      background: ${getColor('blue')};
    `;
  }}
`;

export const SAuthLayoutHeaderWrapper = styled(motion.div)``;

export const SAuthLayoutFooterWrapper = styled(motion.div)`
  flex: 0 0 auto;
`;

export const SLayoutInner = styled.div<{ altLayout?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 1;
  border-radius: 25px 25px 0 0;

  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;

  ${({ altLayout }) => {
    if (altLayout === 'v2') {
      return css`
        background: transparent;
        padding: 34px 20px 0;
      `;
    }

    return css`
      background: ${getColor('cream70')};
      padding: 48px 20px 0;
    `;
  }}
`;

export const SLayoutContent = styled(LayoutLibrary.Content)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 auto;
`;

export const SExtendedLayout = styled.div`
  background: ${getColor('creamSS2')};
  margin-top: -130px;
  height: 200px;
`;

export const SDesktopWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    justify-content: center;
    display: flex;
  }
`;

export const SDesktopBlock = styled.div<{ tabletWidth?: string }>`
  ${ifProp(
    'tabletWidth',
    css`
      @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
        width: ${getProp('tabletWidth')};
      }
    `,
    css`
      @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
        width: 60%;
      }
      @media screen and (min-width: ${MEDIA_SIZE.tablet + 250}px) {
        width: 50%;
      }
    `
  )};
`;
