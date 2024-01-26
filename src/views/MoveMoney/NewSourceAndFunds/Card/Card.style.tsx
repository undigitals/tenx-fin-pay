import styled, { css } from 'styled-components';
import { getColor, getProp, mediaUpTo } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SIconWrapper = styled.div`
  margin: 13px 7px;
`;

export const SSpan = styled.span`
  display: block;
  color: ${getColor('charcoal70')};
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px;
  white-space: nowrap;
`;

export const SCustomRow = styled.div<{
  padding: number;
}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${getProp('padding')}px;
  width: 100%;

  .move-money-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  ${mediaUpTo(
    400,
    css`
      .move-money-card-subtitle .custom-text-inner {
        font-size: 12px;
      }
    `
  )}

  ${mediaUpTo(
    'mobile',
    css`
      .move-money-card-subtitle {
        margin-right: 15px;
        & .custom-text-inner {
          font-size: 11px;
        }
      }
    `
  )}
  .
`;

export const SCustomButton = styled(CustomButton)`
  padding: 0;
  border: none;
  justify-content: left;
  width: 100%;
  > div {
    width: 100%;
  }
`;
