import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SFileItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  height: 56px;
  border: 2px solid ${getColor('charcoal10')};
  border-radius: 16px;
  margin-bottom: 16px;
  cursor: pointer;
`;
