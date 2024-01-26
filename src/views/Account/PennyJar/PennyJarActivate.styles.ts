import styled, { css } from 'styled-components';
import { getColor, mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';
import CreamDots from './Images/CreamDots.svg';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;
  padding-bottom: 30px;

  ${mediaFrom(
    'minDesktop',
    css`
      background-image: url(${CreamDots});
      background-position: right bottom;
      background-repeat: no-repeat;
    `
  )}

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
        margin-bottom: 40px;
        align-items: center;
      `
    )}

    .subtitle {
      color: ${getColor('charcoal')};
      margin-bottom: 8px;
      font-family: Poppins;
      font-size: 28px;
      font-weight: 600;
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

  .activate-card {
    background: ${getColor('white')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    padding: 36px;
    margin-bottom: 30px;
    width: 100%;
    flex-wrap: wrap;

    ${mediaFrom(
      'minDesktop',
      css`
        width: 50%;
      `
    )}

    span {
      font-size: 16px;
      font-weight: 700;
    }
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
