import { images } from 'assets';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import styled, { css } from 'styled-components/macro';
import { getColor, mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SContainer = styled.div`
  display: flex;
  width: 100%;

  .web-view-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    ${mediaUpTo(
      'minDesktop',
      css`
        display: none;
      `
    )}

    .combined-balance {
      margin-right: 10px;
    }
  }

  .mobile-view-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;

    ${mediaFrom(
      'minDesktop',
      css`
        display: none;
      `
    )}

    .available-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      width: 100%;

      .text {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        gap: 5px;
      }

      .amount {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
      }
    }

    .add-money-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      gap: 20px;

      .mini-card {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
      }
    }
  }
`;

export const SCashAccountCardMini = styled.div`
  ${mediaFrom(
    'minDesktop',
    css`
      display: none;
    `
  )}

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
`;

export const SCashAccountCard = styled.div`
  ${mediaUpTo(
    'minDesktop',
    css`
      display: none;
    `
  )}

  background: ${getColor('blue5')};
  width: 278px;
  height: 148px;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  background-position: bottom left;
  background-repeat: no-repeat;
  background-image: url(${images.cashAccountCardBackground});
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .card-number {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .visa {
      width: 48px;
      height: 16px;
    }
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;

    .see-more {
      display: flex;
      align-items: start;
    }
  }
`;

export const SAddMoneyButton = styled(CustomButton)`
  border: 2px solid ${getColor('green20')};
  color: ${getColor('green')};
  height: 44px;
  max-width: 175px;
  padding: 14px 24px;

  font-size: 14px;
  font-weight: 500;

  .plus-icon {
    margin-left: 12px;
  }

  ${mediaFrom(
    'minDesktop',
    css`
      margin-top: 28px;

      .plus-icon {
        display: none;
      }
    `
  )}
`;
