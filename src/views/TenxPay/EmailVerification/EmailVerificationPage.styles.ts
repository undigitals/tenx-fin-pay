import { Icon } from 'components/general/Icon/Icon';
import styled, { css } from 'styled-components';

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smaller',
  cursorPointer: true,
})`
  flex: 0 0 auto;
  margin-left: 21px;
`;

export const SIcon = styled(Icon)`
  position: absolute;
  top: 16px;
  right: 18px;
  z-index: 999;
`;

export const SLayout = styled.div<{ isDesktopSize?: boolean }>`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;

  ${({ isDesktopSize }) =>
    isDesktopSize
      ? css`
          display: flex;
          align-items: center;
        `
      : css``}
    }
`;
