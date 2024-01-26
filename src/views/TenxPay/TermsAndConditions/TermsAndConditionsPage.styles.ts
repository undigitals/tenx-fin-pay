import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import styled, { css } from 'styled-components';
import { TITLE_SIZE } from 'components/general/Typography/Title/Title.styles';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SFooter = styled(CustomRow)`
  background: ${getColor('white')};
  padding: 20px 24px;
  box-shadow: 0px -10px 10px ${getColor('white')};
`;

export const SMediaLayout = styled.div`
  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: ${TITLE_SIZE.T};
      }
    `
  )}
`;

export const SLayout = styled.div<{ isDesktopSize?: boolean }>`
  ${({ isDesktopSize }) =>
    isDesktopSize
      ? css`
          display: flex;
          justify-content: center;
        `
      : css``}
    }
`;
