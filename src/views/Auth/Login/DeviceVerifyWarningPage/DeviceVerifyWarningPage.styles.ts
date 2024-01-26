import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  width: 100%;
  padding-top: 0;
`;

export const SPhone = styled.span`
  color: ${getColor('charcoal')};
`;

export const RoundIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${getColor('white')};
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

export const SFields = styled.div`
  position: relative;
  margin-bottom: 122px;
`;
