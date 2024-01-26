import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${getColor('white')};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 20px;
  justify-content: start;
`;

export const SHeaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
  height: 172px;
`;

export const SIconLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${getColor('cream70')};
`;

export const SItemButton = styled(CustomButton)`
  background: transparent;
  border-color: transparent;
  padding: 8px;
  align-self: flex-end;
  margin-top: auto;
  &:active,
  &:hover {
    background: transparent;
  }
`;
