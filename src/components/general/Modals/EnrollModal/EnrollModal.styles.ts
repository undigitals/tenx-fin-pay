import styled, { css } from 'styled-components';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { mediaUpTo, mediaUpToHeight, getColor } from 'utils/helpers/styleHelpers';

export const SCustomModal = styled(CustomModal)`
  ${mediaUpToHeight(
    850,
    css`
      ${mediaUpTo(
        400,
        css`
          top: 0 !important;
        `
      )}
    `
  )}
  ${mediaUpToHeight(
    750,
    css`
      top: 0% !important;
    `
  )}
  ${mediaUpToHeight(
    700,
    css`
      .custom-title-text {
        font-size: 22px;
      }
    `
  )}

  .enrollModal {
    display: flex;
    justify-content: center;
    flex-direction: column;
    &Header {
      margin-bottom: 25px;
      justify-content: center;
      img {
        height: 127px;
      }
    }
    &Footer {
      flex-direction: row;
      justify-content: flex-end;

      button {
        white-space: normal;
      }
    }
  }
`;

export const SLinkTel = styled.a`
  color: ${getColor('blue')};

  &:hover {
    color: ${getColor('blue')};
  }
`;
