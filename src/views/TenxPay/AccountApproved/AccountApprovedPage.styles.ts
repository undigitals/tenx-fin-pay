import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smaller',
  color: 'white',
  cursorPointer: true,
})`
  flex: 0 0 auto;
  margin-left: 12px;
`;

export const SButtonContentWrapper = styled(CustomRow)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  pointer-events: none;
`;
