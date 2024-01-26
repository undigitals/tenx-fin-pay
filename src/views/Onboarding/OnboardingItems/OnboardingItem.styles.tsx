import styled, { css } from 'styled-components/macro';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SOnboardingItemCard = styled.div`
  background: ${getColor('white')};
  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
  height: 72vh;
  padding: 0 25px 0 20px;
  margin: 0 6px;
  border-radius: 20px;
`;

export const STextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: normal;
  margin-top: 15px;
  margin-bottom: 80px;
  ${mediaUpTo(
    415,
    css`
      margin-top: 0;
      margin-bottom: 40px;
    `
  )}
`;
