import styled from 'styled-components';
import { TThemeColor } from 'styles/theme';
import { Icon } from 'components/general/Icon/Icon';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { getColor, getColorByProp, ifProp } from 'utils/helpers/styleHelpers';

const STEP_HEADER_HEIGHT = 72;

interface ISList {
  markerColor: TThemeColor;
}

interface ISContainer {
  isLastItem: boolean;
  isDisabled?: boolean;
}

interface ISIconContainer {
  bgColor: TThemeColor;
}

export const Container = styled.div<ISContainer>`
  position: relative;
  margin-bottom: ${({ isLastItem }) => (isLastItem ? 25 : 20)}px;
  border-radius: 20px;
  background: ${getColor('white')};
  cursor: ${ifProp('isDisabled', 'default', 'pointer')};
  opacity: ${ifProp('isDisabled', 0.5, 1)};
`;

export const SList = styled.ol<ISList>`
  margin: 5px 0 0 -15px;
  list-style-type: disc;

  li {
    margin-bottom: 4px;
    padding-left: 4px;
    font-size: 13.2px;

    ::marker {
      color: ${getColorByProp('markerColor')};
      font-weight: 700;
      margin-right: 4px;
    }
  }
`;

export const SCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 16px 20px 16px 20px;
  height: ${STEP_HEADER_HEIGHT}px;

  .left {
    display: flex;
    flex: 0 0 auto;
  }
`;

export const SCardContent = styled.div`
  padding: 20px 20px 18px 20px;
`;

export const SIconContainer = styled.div<ISIconContainer>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: ${getColorByProp('bgColor')};
  border-radius: 50%;
`;

export const SIcon = styled(Icon)`
  background: transparent !important;
  padding: 0 !important;
  margin-right: 21px;
`;

export const SCustomButton = styled(CustomButton)`
  width: auto;
`;
