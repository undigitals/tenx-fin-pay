import styled from 'styled-components';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { getColor } from 'utils/helpers/styleHelpers';

export const SMainContentContainer = styled.div`
  section.group {
    ul {
      list-style: none;
      padding: 0;
      margin-bottom: 26px;
    }
  }
`;

export const SCustomButton = styled(CustomButton)`
  border-color: ${getColor('creamS10')};
  background-color: transparent;
  color: ${getColor('charcoal70')};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  width: auto;
  padding: 8px 16px;

  &.noBorder {
    border-color: transparent;
    padding: 0;
  }

  &.active {
    border-color: ${getColor('blue')};
    background-color: ${getColor('blue')};
    color: ${getColor('white')};
  }
`;

export const SCheckboxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
