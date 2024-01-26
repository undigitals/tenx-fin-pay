import styled, { css } from 'styled-components';
import { TThemeColor } from 'styles/theme';

export const SAccountSelector = styled.div<{ isDesktopSize?: boolean }>`
  display: flex;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none !important;
  }

  -ms-overflow-style: none !important;
  scrollbar-width: none !important;

  ${({ isDesktopSize }) =>
    isDesktopSize
      ? css`
          justify-content: flex-start;
          margin: 30px 0 46px 0;
          text-align: center;
        `
      : css`
          gap: 8px;
          margin: 30px 0 30px 6px;
        `}
}
`;

export const SAccountItem = styled.div<{ background: TThemeColor; border: TThemeColor }>`
  height: 40px;
  border-radius: 100px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: ${({ background, theme }) => theme[background]};
  border: 2px solid ${({ border, theme }) => theme[border]};
`;

export const SAccountItemDesktop = styled.div<{ background: TThemeColor; border: TThemeColor }>`
  display: flex;
  flex: 1 216px;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ border, theme }) => theme[border]};
`;
