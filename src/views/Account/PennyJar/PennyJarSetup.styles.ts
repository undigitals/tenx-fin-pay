import styled, { css } from 'styled-components';
import { getColor, mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import CreamDots from './Images/CreamDots.svg';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
  min-height: 100%;

  button {
    :disabled {
      color: ${getColor('charcoal40')};
      background: transparent;
      border: 2px solid ${getColor('charcoal40')};
    }
  }

  ${mediaFrom(
    'minDesktop',
    css`
      background-image: url(${CreamDots});
      background-position: right bottom;
      background-repeat: no-repeat;
    `
  )}

  .title {
    ${mediaUpTo(
      'minDesktop',
      css`
        font-family: Poppins;
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 32px;
      `
    )}
  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 32px;

    ${mediaUpTo(
      'minDesktop',
      css`
        display: none;
      `
    )}

    ${mediaFrom(
      'minDesktop',
      css`
        border-bottom: 1px solid ${getColor('creamS5')};
        gap: 10px;
        height: 87px;
        margin-bottom: 110px;
      `
    )}

    .back {
      ${mediaUpTo(
        'minDesktop',
        css`
          display: none;
        `
      )}
    }

    .title {
      font-family: Poppins;
      font-size: 24px;
      font-weight: 600;

      ${mediaFrom(
        'minDesktop',
        css`
          font-size: 28px;
        `
      )}

      ${mediaUpTo(
        'minDesktop',
        css`
          display: none;
        `
      )}
    }
  }

  .title-container {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    margin-bottom: 32px;

    ${mediaFrom(
      'minDesktop',
      css`
        margin-bottom: 64px;
        align-items: center;
      `
    )}

    .subtitle {
      color: ${getColor('charcoal')};
      margin-bottom: 8px;
      font-family: Poppins;
      font-size: 20px;
      font-weight: 500;
      text-align: start;

      ${mediaFrom(
        'minDesktop',
        css`
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          width: 50%;
        `
      )}
    }

    .description {
      color: ${getColor('charcoal70')};
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 32px;

      ${mediaFrom(
        'minDesktop',
        css`
          width: 50%;
        `
      )}
    }
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .select-card {
    background: ${getColor('white')};
    padding: 32px 24px;
    gap: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 50%;
    margin: 25px 0 40px 0;
  }

  .btn-container {
    display: flex;
    margin-bottom: 20px;

    ${mediaFrom(
      'minDesktop',
      css`
        justify-content: center;

        button {
          width: 250px;
          height: 52px;
          padding: 14px 40px;
          font-family: Poppins;
          font-size: 18px;
          font-weight: 500;
          margin-top: 25px;
        }
      `
    )}
  }

  .disclosure-container {
    display: flex;

    span {
      font-size: 10px;
      font-weight: 400;
      color: ${getColor('charcoal70')};
      line-height: 16px;
    }

    ${mediaFrom(
      'minDesktop',
      css`
        width: 75%;
        justify-content: flex-start;
        margin: 30px 0 30px 30px;
      `
    )}
  }
`;

export const SModalButton = styled(CustomButton)`
  width: 164px;
  padding: 14px 40px;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  align-self: center; ;
`;
