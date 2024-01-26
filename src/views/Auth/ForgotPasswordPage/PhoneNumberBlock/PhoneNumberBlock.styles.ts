import styled, { css } from 'styled-components/macro';
import { round, flexCenter, flex, mediaFrom } from 'utils/helpers/styleHelpers';

export const SPhoneNumberBlock = styled.div`
  .phone-block {
    ${flex('row', 'flex-start')};
    gap: 10px;
    flex-wrap: wrap;
  }

  .icon-wrapper {
    ${flexCenter};
    ${round(48, 'white')};
  }

  button.primary {
    margin-top: 60px;
    ${mediaFrom(
      'tablet',
      css`
        margin-top: 30px;
        width: 140px;
        max-width: 265px;
        margin-right: 16px;
      `
    )}
  }
`;
