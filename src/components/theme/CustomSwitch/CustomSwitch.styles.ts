import Text from 'antd/lib/typography/Text';
import styled from 'styled-components/macro';
import { getColor, getColorIf } from 'utils/helpers/styleHelpers';
import { InnerProps, LabelProps } from './CustomSwitch.types';

export const SSwitch = styled.div`
  height: 36.52px;
  width: 108px;
  border-radius: 100px;
  background: ${getColor('orange')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SInner = styled.div<InnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  width: 48px;
  height: 25px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${getColorIf('selected', 'white', 'orange')};
`;

export const SLabel = styled(Text)<LabelProps>`
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  color: ${getColorIf('selected', 'charcoal', 'white')};
`;
