import styled from 'styled-components';
import { getColor, getProp } from 'utils/helpers/styleHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SIconWrapper = styled.div`
  margin: 13px 7px;
`;

export const SCustomRow = styled(CustomRow)<{
  padding: number;
}>`
  padding: ${getProp('padding')}px;
  width: 100%;
`;

export const SCustomButton = styled(CustomButton)`
  padding: 0;
  border: none;
  justify-content: left;
  width: 100%;
  > div {
    width: 100%;
  }
`;
