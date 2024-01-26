import styled, { css } from 'styled-components';
import { getColor, mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SBorderedBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${getColor('charcoal5')};
  padding: 20px;
  cursor: pointer;
  width: 100%;
  margin: 16px 0;

  ${mediaFrom(
    'minDesktop',
    css`
      max-width: 265px;
      margin-right: 16px;
      flex-direction: column;
      margin-bottom: 0;
    `
  )};

  .title-container {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: row;
    gap: 15px;

    ${mediaFrom(
      'minDesktop',
      css`
        flex-direction: column;
        align-items: flex-start;
      `
    )};

    .top {
      ${mediaFrom(
        'minDesktop',
        css`
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: center;
          width: 100%;
        `
      )};

      .arrow {
        ${mediaUpTo(
          'minDesktop',
          css`
            display: none;
          `
        )};
      }
    }
  }

  .actions-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 17px;

    ${mediaFrom(
      'minDesktop',
      css`
        align-items: flex-end;
        justify-content: flex-start;
        width: 100%;
      `
    )};

    .bottom-arrow {
      ${mediaFrom(
        'minDesktop',
        css`
          display: none;
        `
      )};
    }
  }
`;

export const SStartIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;

  border-radius: 24px;
  flex: 0 0 auto;

  ${mediaFrom(
    'minDesktop',
    css`
      margin-bottom: 8px;
      background: #fef2ed;
      width: 48px;
      height: 48px;
      padding: 12px;
    `
  )};
`;
