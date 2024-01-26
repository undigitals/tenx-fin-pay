import styled from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { getColor } from 'utils/helpers/styleHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';

export const STick = styled(Icon).attrs({
  color: 'blue',
})`
  flex: 0 0 auto;
`;

export const SCustomRow = styled(CustomRow)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  z-index: 9999;
  background-color: ${getColor('cream70')};
`;

export const SLayout = styled.div`
  padding-bottom: 42px;
`;
