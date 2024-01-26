import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smallest',
  color: 'white',
})`
  margin-left: 12px;
`;

export const SButtonContentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
`;
