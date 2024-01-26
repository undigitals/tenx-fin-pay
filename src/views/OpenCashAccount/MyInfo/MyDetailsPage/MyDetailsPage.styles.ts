import styled, { css } from 'styled-components';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SMyDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 24px 20px;
  margin-top: 20px;
  border-radius: 20px;
  background: ${getColor('white')};

  ${mediaUpTo(
    400,
    css`
      margin-top: 10px;
    `
  )}

  ${mediaUpTo(
    'mobile',
    css`
      margin-top: 0;
      padding: 8px 20px;
    `
  )}
`;

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 17px;
  padding-left: 6px;

  ${mediaUpTo(
    400,
    css`
      padding-top: 13px;
      .custom-title-text {
        font-size: 25px;
      }

      .card-header {
        padding: 16px 30px;
      }

      .my-details-status {
        & .custom-text-inner {
          font-size: 14px;
        }

        & .custom-title-text {
          font-size: 21px;
        }
      }
    `
  )}

  ${mediaUpTo(
    'mobile',
    css`
      padding-top: 10px;
      padding-left: 5px;
      .icon-exitFlow {
        width: 20px;
        height: 20px;
      }
    `
  )}

  .primary-employer-name {
    display: flex;
    flex-direction: column;
    margin-top: 22px;
  }

  .my-details-status {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &-header {
      margin-bottom: 36px;
      margin-top: 10px;
    }
    &-items {
      margin-bottom: 30px;
      &-inner {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        margin-bottom: 24px;
        width: 100%;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    padding-top: 40px;
  }

  ${mediaUpTo(
    'mobile',
    css`
      .body {
        padding: 20px;
      }
      .custom-title-text {
        font-size: 24px;
      }
      .custom-text-inner {
        font-size: 11px;
      }

      .my-details-status {
        & .custom-text-inner {
          font-size: 14px;
        }

        & .custom-title-text {
          font-size: 20px;
        }
      }

      .card-header {
        padding: 16px 40px;
      }

      label {
        font-size: 13px;
        & + div {
          & input {
            font-size: 14px;
          }
        }
      }
    `
  )}
`;
