import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';

export const SCircle = styled.div`
  width: 148px;
  height: 148px;
  background: ${getColor('green5')};
  border-radius: 50%;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SCard = styled.div`
  padding: 48px 20px 31px;
  border: 2px solid ${getColor('charcoal5')};
  border-radius: 20px;
`;

export const SCustomRow = styled(CustomRow)`
  margin-bottom: 27px;
  justify-content: space-between;
  width: 100%;
  gap: 50%;
`;
