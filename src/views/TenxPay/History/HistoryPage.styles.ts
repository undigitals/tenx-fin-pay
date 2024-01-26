import styled from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { getColor } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const SFilter = styled(Icon).attrs({
  name: 'filter',
  size: 'small',
  color: 'charcoal70',
  cursorPointer: true,
})`
  flex: 0 0 auto;
  position: absolute;
  top: -38px;
  right: 10px;
`;

export const SActionBar = styled(CustomRow)`
  .ant-btn {
    :focus,
    :hover {
      background-color: ${getColor('blue20')} !important;
      border-color: ${getColor('blue20')} !important;
    }
  }

  .time-card-btn {
    width: 128px;
    height: 36px;
  }
`;

export const SActionCustomButton = styled(CustomButton)`
  padding-top: 5px;
  padding-bottom: 5px;
`;
