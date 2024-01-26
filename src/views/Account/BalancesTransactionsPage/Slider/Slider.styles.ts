import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 362px;
  border-right: 1.5px ${getColor('creamS5')} solid;
  padding: 24px 32px 0 0;
`;

export const SDateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SCalendarContainer = styled.div`
  display: flex;
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
`;
