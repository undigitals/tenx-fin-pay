import { Icon } from 'components/general/Icon/Icon';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import styled from 'styled-components';

export const SIconClose = styled(Icon)`
  position: absolute;
  top: 14px;
  right: 14px;
  pointer-events: none;
`;

export const SCustomButton = styled(CustomButton)`
  height: 44px;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
`;
