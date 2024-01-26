import styled, { css } from 'styled-components';
import bgCreamGradient from 'assets/images/bgCreamGradient.svg';

export const SLayout = styled.div<{ isFullWidth?: boolean }>`
  background-image: url(${bgCreamGradient});

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      height: 380px;
      padding: 0 90px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    `};

  header {
    display: flex;
    justify-content: space-between;
    background-position: bottom;
    min-height: 318px;
    padding: 0 60px 52px;
  }

  header .titleContainer {
    display: flex;
    flex-direction: column;
    flex: 5;
    padding-top: 32px;
  }

  header .imageContainer {
    display: flex;
    flex: 3;
    justify-content: flex-end;
    height: 232px;
    overflow: hidden;
    align-items: center;
  }
`;
