import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import styled, { css } from 'styled-components/macro';
import { getColor, getProp, ifProp, mediaUpTo } from 'utils/helpers/styleHelpers';
import { TThemeColor } from 'styles/theme';

interface ICardProps {
  isActive?: boolean;
  background?: TThemeColor;
}

export const SLayout = styled.div`
  padding-top: 10px;
  padding-left: 5px;

  ${mediaUpTo(
    400,
    css`
      .custom-title-text {
        font-size: 22px;
      }

      .custom-text-inner {
        font-size: 12px;
      }
    `
  )}

  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: 20px;
      }

      .custom-text-inner {
        font-size: 11px;
      }
    `
  )}
`;

export const TenxyBoxButton = styled.div`
  gap: 48px;
  background: ${getColor('white')};
  border-radius: 20px;
  margin-bottom: 48px;
  border: none;
  width: 100%;
`;

export const SCustomButton = styled(CustomButton)`
  border: 0;
  padding: 0;
  width: auto;
  font-size: 14px;

  :disabled {
    border: none;
  }
`;

export const Box = styled.div<{
  margin?: string;
  padding?: string;
  justify?: string;
  align?: string;
  changeDirection?: boolean;
  width?: string;
  cursorPointer?: boolean;
  gap?: string;
}>`
  display: flex;
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  justify-content: ${({ justify }) => justify || 'normal'};
  align-items: ${({ align }) => align || 'normal'};
  flex-direction: ${({ changeDirection }) => (!changeDirection ? 'row' : 'column')};
  width: ${({ width }) => width || 'auto'};
  cursor: ${({ cursorPointer }) => (cursorPointer ? 'pointer' : 'default')};
  gap: ${({ gap }) => gap || 0};
`;

export const StyledCustomButton = styled(CustomButton)`
  width: 100%;
  max-height: 51px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SBlock = styled.div`
  width: 100%;
  border-radius: 20px;
  background-color: ${getColor('white')};
  padding: 34px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaUpTo(
    400,
    css`
      padding-top: 22px;
    `
  )}

  ${mediaUpTo(
    'mobile',
    css`
      padding-left: 15px;
    `
  )}

  .transfer-block {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 12px;
    ${mediaUpTo(
      'mobile',
      css`
        margin-top: 12px;

        & > .body-text {
          margin-right: 11px;
          & .custom-text-inner {
            font-size: 13px;
          }
        }

        & .icon-info {
          width: 14px;
          height: 14px;
        }
      `
    )}
  }

  .view-transfer-history {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 45px;
    margin-bottom: 10px;
    ${mediaUpTo(
      400,
      css`
        margin-top: 35px;
      `
    )}
    ${mediaUpTo(
      'mobile',
      css`
        margin-top: 40px;
      `
    )}
  }
`;

export const STransferBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 12px;

  ${mediaUpTo(
    'mobile',
    css`
      gap: 8px;
    `
  )}
`;

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${getColor('white')};
  border: 2px solid ${getColor('blue')};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SCustomRow = styled(CustomRow)`
  padding-bottom: 28px;
`;

export const SCreditCard = styled.div<ICardProps>`
  width: 210px;
  height: 128px;
  border-radius: 20px;
  background: ${getColor('transparent')};
  border: ${ifProp('isActive', css`2px dashed ${getColor('blue')}`, css`2px dashed ${getColor('charcoal40')}`)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SIcon = styled(Icon)`
  margin-bottom: 16px;
`;

export const SAmountTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 25px;
`;

export const SAmountInput = styled.input`
  font-size: 24px;
  font-weight: 600;
  font-family: 'DM Sans', Arial, sans-serif;
  border: none;
  padding: 0;
  position: relative;
  left: 205px;

  &:focus {
    outline: none;
    border: none;
  }

  ::placeholder {
    font-size: 24px;
    font-weight: 600;
    font-family: 'DM Sans', Arial, sans-serif;
    color: ${getColor('charcoal')};
  }
`;

export const SAmountInputPercPay = styled(SAmountInput)`
  width: 100%;
  text-align: right;
  font-size: 32px;
  font-family: 'Poppins', Arial, sans-serif;
  left: auto;
`;

export const SAmountResult = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const SModalCloseButton = styled(Icon).attrs({
  name: 'close',
  cursorPointer: true,
})`
  position: absolute;
  top: 14px;
  border: 2px solid ${getColor('blue')};
  color: ${getColor('blue')};
  right: 14px;
  width: 22px;
  height: 22px;
  border-radius: 50px;
  padding: 4px;

  ${({ color }) => css`
    color: ${getColor(color ?? 'blue')};
    border-color: ${getColor(color ?? 'blue')};
  `};
`;

export const SIframeCloseButton = styled.div`
  svg {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const SIFrame = styled.iframe`
  min-height: 600px;
  width: 100%;
  margin-top: 40px;
  height: ${getProp('height', 'auto')};
  border: 0;
`;

export const SStatusImage = styled.img`
  width: auto;
  max-width: 100%;
  margin: 0 auto 30px;
`;
