import { Icon } from 'components/general/Icon/Icon';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';

export const SContent = styled.div`
  position: relative;
  background: ${getColor('white')};
  border-radius: 20px;
  padding: 24px;
`;

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 35px;
  padding-left: 5px;
  min-height: 100%;
`;

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smaller',
  cursorPointer: true,
})`
  flex: 0 0 auto;
  margin-left: 21px;
`;

export const SButtonContentWrapper = styled(CustomRow)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;
