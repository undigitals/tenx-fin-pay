import styled, { css } from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { mediaUpTo, getColor, getProp } from 'utils/helpers/styleHelpers';

export const SImageBorder = styled.div``;

interface ICircleProps {
  size: number;
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
}

export const SCircle = styled.div<ICircleProps>`
  background-color: white;
  width: ${getProp('size')}px;
  height: ${getProp('size')}px;
  border-radius: 50%;
  position: absolute;
  top: ${getProp('top')}px;
  bottom: ${getProp('bottom')}px;
  left: ${getProp('left')}px;
  right: ${getProp('right')}px;
`;

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smallest',
  color: 'white',
})`
  margin-left: 20px;
`;

export const SRow = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-end;
`;

export const SIconCircle = styled.div`
  width: 150px;
  height: 150px;
  background: ${getColor('white')};
  border-radius: 50%;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SIconWrapper = styled.div`
  padding: 12px;
  border-radius: 50%;
  background-color: ${getColor('white')};
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px auto 16px;
`;

export const SIcon = styled(Icon)``;

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;

  img {
    display: block;
    margin: 72px auto 24px;
    ${mediaUpTo(
      380,
      css`
        margin: 0px auto 24px;
      `
    )}
  }
`;

export const SCustomRow = styled(CustomRow)`
  margin-top: 10%;
`;

export const SCustomButton = styled(CustomButton)`
  margin-top: 48px;
  ${mediaUpTo(
    380,
    css`
      margin-top: 20px;
    `
  )}
`;

export const SAdditionalButton = styled(CustomButton)`
  margin-top: 20px;
  margin-bottom: 40px;
  ${mediaUpTo(
    380,
    css`
      margin-top: 12px;
    `
  )}
`;
