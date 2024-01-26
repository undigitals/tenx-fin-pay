import styled, { css } from 'styled-components';
import { getColor, mediaUpTo, mediaUpToHeight } from 'utils/helpers/styleHelpers';
import { TThemeColor } from 'styles/theme';

export interface SBarInputProps {
  bgColor: TThemeColor;
}

export const SBar = styled.div<SBarInputProps>`
  height: 4px;
  background: ${({ bgColor }) => getColor(bgColor)};
  width: 100%;
`;

export const SContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 15px;

  ${mediaUpTo(
    400,
    css`
      .custom-text-inner {
        font-size: 11px;
      }
    `
  )}

  ${mediaUpTo(
    365,
    css`
      .custom-text-inner {
        font-size: 10px;
      }
    `
  )}

  ${mediaUpTo(
    340,
    css`
      .custom-text-inner {
        font-size: 9px;
      }
    `
  )}
`;

export const SBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  ${mediaUpTo(
    380,
    css`
      ${mediaUpToHeight(
        700,
        css`
          .custom-text-inner {
            font-size: 11px;
          }
        `
      )}
    `
  )}
`;
