import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smallest',
  color: 'white',
})`
  margin-left: 20px;
`;

export const SList = styled.ul`
  margin-left: -15px;
`;

export const SListItem = styled.li`
  margin-bottom: 5px;
  padding-left: 5px;
  color: ${getColor('charcoal70')};
  font-family: DM Sans;
`;
