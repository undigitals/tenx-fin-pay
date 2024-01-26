import { images } from 'assets';
import styled, { css } from 'styled-components/macro';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SFinancialWellnessImage = styled.div`
  position: relative;
  width: 313px;
  height: 250px;
  background-color: ${getColor('white')};
  margin: 25px 25px 35px 25px;
  background: url(${images.financialWellness}) no-repeat center / contain;

  ${mediaUpTo(
    380,
    css`
      width: 290px;
      margin: 0;
      margin-top: 5px;
      flex: 1 1 auto;
      & + div {
        & .custom-title-text {
          padding-right: 88px;
        }
        & .custom-text-inner {
          padding-right: 65px;
        }
      }
    `
  )}
`;
