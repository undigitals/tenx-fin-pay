import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { getColor } from 'utils/helpers/styleHelpers';

export const SIconTooltip = styled(Icon).attrs({
  name: 'circleQuestion',
  color: 'blue',
})`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 16px;
  height: 16px;
`;

export const SButton = styled(CustomButton)`
  margin-top: 20px;
  border-color: ${getColor('blue20')};

  &.primary {
    border-color: ${getColor('blue')};
  }
`;

export const SList = styled.ul`
  padding-left: 25px;

  li {
    color: ${getColor('blue')};
    font-weight: 700;
    font-size: 14px;
    margin-right: 4px;
  }
`;
