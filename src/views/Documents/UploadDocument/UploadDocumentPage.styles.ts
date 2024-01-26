import styled, { css } from 'styled-components';
import { mediaUpTo } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding-left: 5px;

  .footer {
    padding-bottom: 55px;
  }

  ${mediaUpTo(
    'mobile',
    css`
      .title {
        margin-bottom: 25px;
      }

      .custom-title-text {
        font-size: 24px;
      }

      .upload-sheet {
        & .custom-title-text {
          font-size: 22px;
        }
        & .custom-text-inner {
          font-size: 14px;
        }
      }

      .subtitle .custom-text-inner {
        font-size: 17px;
      }

      .custom-text-inner {
        font-size: 12px;
      }

      .upload-card .custom-text-inner {
        font-size: 13px;
      }

      .footer {
        padding-bottom: 10px;
      }
    `
  )}
`;
