import styled, { css } from 'styled-components';
import { mediaUpTo, getColor } from 'utils/helpers/styleHelpers';

export const SLink = styled.span`
  color: ${getColor('blue')};
  text-decoration: underline;
  cursor: pointer;
`;

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  padding-left: 5px;
  .sutton-disclaimer-note {
    margin-top: 13px;
  }

  ${mediaUpTo(
    400,
    css`
      .custom-title-text {
        font-size: 22px;
      }
      .custom-text-inner {
        font-size: 14px;
      }
      .add-account-title {
        margin-top: 40px;
      }

      .icon-sign {
        width: 40px;
        height: 40px;
      }

      .icon-creditCard {
        width: 20px;
        height: 20px;
      }

      .sutton-disclaimer-note .custom-text-inner {
        font-size: 12px;
      }
    `
  )}

  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: 20px;
      }

      .custom-text-inner {
        font-size: 13px;
      }

      .add-account-title {
        margin-top: 30px;
      }

      .sutton-disclaimer-note .custom-text-inner {
        font-size: 11px;
      }
    `
  )}
`;
