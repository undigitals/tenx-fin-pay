import styled, { css } from 'styled-components/macro';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SWrapper = styled.div`
  margin: 0 6px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 580px;

  ${mediaUpTo(
    'mobile',
    css`
      height: 515px;
    `
  )}
`;

export const SContainer = styled.div`
  background: ${getColor('white')};
  display: flex;
  flex: 1 0 auto;
  padding: 20px 17px;
  align-items: center;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  ${mediaUpTo(
    415,
    css`
      padding-right: 0;
      padding-bottom: 0;
    `
  )}
`;

export const SImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  flex: 0 0 auto;
  margin: 28px 0 25px 0;

  img {
    height: 100%;
    width: auto;
  }

  ${mediaUpTo(
    'mobile',
    css`
      height: 190px;
      margin-right: 19px;
      margin-top: 19px;
    `
  )}
`;

export const STextContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  white-space: normal;
  padding: 0 10px;

  ${mediaUpTo(
    'mobile',
    css`
      padding-left: 3px;

      .custom-title-text {
        font-size: 24px;
      }

      .custom-text-inner {
        font-size: 16px;
        padding-right: 5px;
      }
    `
  )}
`;
