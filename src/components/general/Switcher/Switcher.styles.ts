import styled, { css } from 'styled-components';
import { TThemeColor } from 'styles/theme';
import { getColor } from 'utils/helpers/styleHelpers';

export const SSwitcher = styled.button<{ color: TThemeColor; checked: boolean }>`
  width: 48px;
  height: 24px;
  padding: 2px;
  border-radius: 100px;
  border: none;
  cursor: pointer;

  ${({ color }) =>
    css`
      background-color: ${getColor(color)};
    `}

  &[role="switch"][aria-checked="true"] span {
    transform: translateX(24px);
  }
  &[role='switch'][aria-checked='false'] span {
    transform: translateX(0px);
  }
`;

export const SInner = styled.span<{ checked: boolean }>`
  display: block;
  height: 20px;
  width: 20px;
  border-radius: 100px;
  background-color: white;
  transition: all 0.4s;
`;

// ${(checked) =>
//   checked
//     ? css`
//         transform: translateX(24px);
//       `
//     : css`
//         transform: translateX(-24px);
//       `};
