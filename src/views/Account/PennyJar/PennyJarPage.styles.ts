import styled, { css } from 'styled-components';
import { getColor, mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';
import PennyJarBackground from './Images/PennyJarBackground.svg';
import CreamDots from './Images/CreamDots.svg';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 85%;
  justify-content: space-between;
  padding-bottom: 30px;
  min-height: 100%;

  ${mediaFrom(
    'minDesktop',
    css`
      background-image: url(${PennyJarBackground}), url(${CreamDots});
      background-position-y: 25%, 100%;
      background-position-x: 50%, 100%;
      background-repeat: no-repeat, no-repeat;
    `
  )}

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 32px;

    ${mediaFrom(
      'minDesktop',
      css`
        border-bottom: 1px solid ${getColor('creamS5')};
        gap: 10px;
        height: 87px;
        margin-bottom: 110px;
      `
    )}

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
    }

    .back {
      ${mediaUpTo(
        'minDesktop',
        css`
          display: none;
        `
      )}
    }
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info-card {
    background: ${getColor('white')};
    display: flex;
    padding: 24px;
    margin-bottom: 40px;
    border-radius: 20px;
    flex-direction: column;

    ${mediaFrom(
      'minDesktop',
      css`
        width: 75%;
        flex-direction: row;
        padding: 32px 24px;
      `
    )}

    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;

      ${mediaUpTo(
        'minDesktop',
        css`
          margin-bottom: 32px;
        `
      )}

      .logo {
        width: 155px;
        height: 157px;
        flex: 0 0 auto;
      }
    }

    .text-container {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      gap: 16px;

      ${mediaFrom(
        'minDesktop',
        css`
          margin-left: 32px;
        `
      )}

      .title {
        color: ${getColor('charcoal')};
        font-family: Poppins;
        font-size: 20px;
        font-weight: 600;
      }

      .description {
        color: ${getColor('charcoal70')};
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  .title-container {
    display: flex;
    justify-content: flex-start;
    align-items: start;
    flex-direction: column;
    margin-bottom: 32px;

    ${mediaFrom(
      'minDesktop',
      css`
        justify-content: center;
        align-items: center;
        margin-bottom: 64px;
      `
    )}

    .subtitle {
      color: ${getColor('charcoal')};
      font-family: Poppins;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 3px;
      text-align: start;

      ${mediaFrom(
        'minDesktop',
        css`
          font-size: 32px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 16px;
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
          text-align: center;
        `
      )}
    }
  }

  .btn-container {
    display: flex;
    margin-bottom: 20px;

    ${mediaFrom(
      'minDesktop',
      css`
        justify-content: center;
        margin-bottom: 50px;

        button {
          width: auto;
          padding: 14px 40px;
          font-family: Poppins;
          font-size: 18px;
          font-weight: 500;
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
export const PennyJarActivatedImage: React.CSSProperties = {
  marginInline: 'auto',
};
