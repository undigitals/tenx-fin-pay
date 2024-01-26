import styled from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { getColor, getColorByProp, getColorIf } from 'utils/helpers/styleHelpers';

interface ISInnerCircle {
  bgColor?: string;
}

export const SContainer = styled.div<{ isLast?: boolean }>`
  position: absolute;
  left: -44px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: ${({ isLast }) => (isLast ? '100%' : 'calc(100% + 20px)')};
  width: 32px;
  margin-top: 20px;
`;

export const SInnerCircle = styled.div<ISInnerCircle>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${getColor('green')};
  border-radius: 50%;
  background-color: ${getColorByProp('bgColor')};
`;

export const SOuterCircle = styled.div<{ isFailed: boolean }>`
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  z-index: 10;
  border: 2.5px solid ${getColorIf('isFailed', 'red30', 'green40')};
  opacity: 0.8;
  border-radius: 50%;
`;

export const SLine = styled.div`
  position: relative;
  border: 1px solid ${getColor('creamS10')};
  height: 100%;
  width: 0;
  z-index: 2;
`;

export const SIcon = styled(Icon)`
  margin-right: 0 !important;
  width: 11px;
`;
