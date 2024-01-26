import styled, { css } from 'styled-components';
import { mediaUpTo } from 'utils/helpers/styleHelpers';

export const NotificationsTabLayout = styled.div`
  .settings {
    &-outer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 34px;
      height: 50px;
    }

    &-inner {
      display: flex;
      justify-content: space-between;
    }

    &-checkbox {
      display: inline-flex;
    }

    &-available-balance {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
    }

    &-alert-source-items {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &-security-outer {
      display: flex;
      flex-direction: column;
    }

    &-security-inner {
      display: flex;
      align-items: flex-start;
    }
  }

  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: 22px;
      }
    `
  )}
`;
