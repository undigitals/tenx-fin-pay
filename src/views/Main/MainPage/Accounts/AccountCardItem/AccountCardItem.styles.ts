import { Icon } from 'components/general/Icon/Icon';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import styled, { css } from 'styled-components';
import { mediaFrom, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SIcon = styled(Icon)`
  flex: 0 0 auto;
`;

export const SItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 32px;

  ${mediaUpTo(
    'minDesktop',
    css`
      .cash-account-link {
        display: none;
      }

      .combined-balance-mobile {
        margin-top: 16px;
      }
    `
  )}

  ${mediaFrom(
    'minDesktop',
    css`
      flex-direction: row;
      gap: 16px;

      .combined-balance-mobile {
        display: none;
      }
    `
  )};
`;

export const STransferButtonContainer = styled.div`
  display: flex;

  ${mediaFrom(
    'minDesktop',
    css`
      justify-content: flex-end;
    `
  )}
`;

export const STransferBetweenAccounts = styled(CustomButton)`
  ${mediaFrom(
    'minDesktop',
    css`
      width: 230px;
      height: 36px;
      font-size: 12px;
      font-weight: 500;
      font-family: 'Poppins', sans-serif;
      white-space: nowrap;
    `
  )}

  padding: 12px 24px;
  margin-top: 16px;
`;
