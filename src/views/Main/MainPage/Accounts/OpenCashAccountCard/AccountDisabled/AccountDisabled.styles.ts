import styled from 'styled-components';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { getColorByProp } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';
import { TThemeColor } from 'styles/theme';

export interface IIconProps {
  readonly bgColor: TThemeColor;
}

export const STextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 15px;
`;

export const SCustomButton = styled(CustomButton)`
  border: 0;
  align-self: flex-end;
`;

export const SContainer = styled(CustomCard)`
  position: relative;

  button.primary {
    align-self: flex-end;
    margin-top: 24px;
    letter-spacing: 1px;
  }
`;

export const SIcon = styled(Icon)`
  width: 22px;
  position: relative;
  flex: 0 0 auto;
  top: 24%;
  margin: auto;
`;

export const SIconWrapper = styled.div<IIconProps>`
  background: ${getColorByProp('bgColor')};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
