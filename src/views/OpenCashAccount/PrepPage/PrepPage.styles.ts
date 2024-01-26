import { mediaUpTo, mediaUpToHeight, getColor } from 'utils/helpers/styleHelpers';
import styled, { css } from 'styled-components';

export const SLayout = styled.div`
  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: 23px;
      }

      .custom-text-inner {
        font-size: 12px;
      }

      .prep-page {
        &-subtitle {
          margin-bottom: 0;
          & + .body-text {
            margin-top: 29px;
            & .custom-text-inner {
              font-size: 13px;
            }
          }
        }
      }

      .list-item {
        & .custom-text-inner {
          font-size: 11px;
        }
        &-text {
          & li {
            margin-left: 33px;
            font-size: 12px;
          }
          & + .body-text {
            margin-top: 21px;
            & .custom-text-inner {
              font-size: 11px;
              line-height: 1.5;
            }
          }
        }
      }

      button {
        margin-top: 64px;
      }
    `
  )}

  ${mediaUpTo(
    380,
    css`
      .custom-title-text {
        font-size: 24px;
      }

      .prep-page-subtitle {
        margin-top: 6px;
        & + .body-text {
          margin-top: 34px;
        }
      }

      .list-item-text + .body-text {
        margin-top: 28px;
        .custom-text-inner {
          font-size: 12px;
        }
      }
    `
  )}
`;

export const SListItemText = styled.li`
  display: flex;
  font-family: DM Sans;
  padding-right: 30px;
  margin-left: 43px;
  margin-top: 8px;
  line-height: 1.3;
  color: ${getColor('charcoal70')};

  &::before {
    content: '\u2022';
    color: blue;
    display: inline-block;
    margin-right: 13px;
  }

  ${mediaUpTo(
    380,
    css`
      ${mediaUpToHeight(
        680,
        css`
          & {
            font-size: 12px;
          }
        `
      )}
    `
  )}
`;
