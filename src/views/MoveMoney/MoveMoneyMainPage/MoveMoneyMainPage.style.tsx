import styled, { css } from 'styled-components';
import { getColor, getProp, mediaUpTo } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';

export const SLayout = styled.div`
  .move-money-card {
    & .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-start {
        justify-content: flex-start;
      }
    }
    &-inner {
      cursor: pointer;
      margin-right: 15px;
    }
    &-icon-wrapper {
      position: absolute;
      right: 5%;
    }
  }

  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: 21px;
      }
    `
  )}
`;

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SIcon = styled(Icon)`
  background: ${getColor('blue5')};
  width: 22px;
  position: relative;
  flex: 0 0 auto;
  top: 7px;
  margin: auto;
`;

export const SComingSoonModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
`;

export const SModalTextBlock = styled.div`
  align-self: flex-start;
`;

export const SIFrame = styled.iframe`
  min-height: 600px;
  width: 100%;
  margin-top: 40px;
  height: ${getProp('height', 'auto')};
  border: 0;
`;
