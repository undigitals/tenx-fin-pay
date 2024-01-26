import styled, { css } from 'styled-components';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { getColor, mediaFrom, ifProp } from 'utils/helpers/styleHelpers';

interface ISContainerProps {
  isWellnessDesktop?: boolean;
}

export const SContainer = styled(CustomCard)<ISContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 16px 0;

  ${ifProp(
    'isWellnessDesktop',
    css`
      flex-direction: row;
      align-items: center;
    `
  )};

  ${mediaFrom(
    'minDesktop',
    css`
      flex: 1;
    `
  )}

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${ifProp('isWellnessDesktop', '0', '10')}px;
    align-items: center;

    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
    }

    .icon-text-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 30px;
    }
  }

  .text-container {
    display: flex;
    flex-direction: column;

    ${ifProp(
      'isWellnessDesktop',
      css`
        flex-direction: row;
        align-items: center;
      `
    )};
  }

  .description {
    margin-left: ${ifProp('isWellnessDesktop', '20', '80')}px;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: ${ifProp('isWellnessDesktop', '0', '20')}px;

    button {
      font-size: 12px;
      font-weight: 500;
      font-family: 'Poppins';
    }

    ${ifProp(
      'isWellnessDesktop',
      css`
        height: 40px;
      `,
      css`
        ${mediaFrom(
          'minDesktop',
          css`
            button {
              background: transparent;
              border: none;
              color: #3e4fe5;

              :hover {
                background: transparent;
              }
            }

            justify-content: flex-start;
            margin-left: 60px;
          `
        )}
      `
    )};
  }

  .tenx-points {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .title {
      font-family: 'DM Sans';
      font-size: 12px;
      font-weight: 400;
      color: ${getColor('charcoal70')};
      margin-left: 80px;

      ${mediaFrom(
        'minDesktop',
        css`
          color: #353131;
          margin-left: 0;

          ::after {
            content: ':';
          }
        `
      )};
    }

    .points {
      font-family: 'Poppins';
      font-size: 28px;
      font-weight: 700;
      margin-left: 80px;

      ${mediaFrom(
        'minDesktop',
        css`
          font-size: 20px;
          font-weight: 600;
          margin-right: 15px;
          margin-left: 0;
        `
      )}
    }

    ${mediaFrom(
      'minDesktop',
      css`
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        margin: 26px 0 0 80px;
      `
    )}
  }

  .icon-circleInfo {
    position: absolute;
    top: 10%;
    right: 5%;
  }
`;
