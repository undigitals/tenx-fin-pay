import styled, { css } from 'styled-components';
import { images } from 'assets';
import { getColor, mediaFrom } from 'utils/helpers/styleHelpers';

export const SCard = styled.div`
  display: flex;
  margin-bottom: 30px;
  background: ${getColor('white')};
  border-radius: 20px;
  padding: 24px;
  justify-content: flex-start;

  ${mediaFrom(
    'minDesktop',
    css`
      width: 876px;
      padding: 56px 40px;
    `
  )}

  .percup-image {
    width: 96px;
    height: 43.199px;
    background-color: ${getColor('white')};
    margin: 11px 18px auto 0;
    background: url(${images.earnPercPoints}) no-repeat center / contain;
    flex: 0 0 auto;

    ${mediaFrom(
      'minDesktop',
      css`
        width: 184px;
        height: 82.798px;
        margin-right: 48px;
      `
    )}
  }

  .text-button-container {
    display: flex;
    flex-direction: column;

    .button-container {
      display: flex;
      justify-content: flex-end;

      button {
        width: 139px;
        height: 36px;
        padding: 14px 16px;

        font-size: 12px;
        font-weight: 500;
      }
    }

    ${mediaFrom(
      'minDesktop',
      css`
        justify-content: flex-start;
        gap: 24px;

        .button-container {
          justify-content: flex-start;

          button {
            width: 238px;
            height: 52px;
            padding: 14px 40px;

            font-size: 18px;
            font-weight: 500;
          }
        }
      `
    )}
  }

  .info-container {
    margin-left: 10px;

    ${mediaFrom(
      'minDesktop',
      css`
        margin-top: -30px;
        margin-right: -15px;
      `
    )}

    .info {
      flex: 0 0 auto;
    }
  }
`;
