import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { getDeviceHeaderSizes } from 'utils/helpers/uiHelpers';

const { headerHeight } = getDeviceHeaderSizes();

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SIcon = styled(Icon)`
  background: ${getColor('blue5')};
  width: 22px;
  position: relative;
  flex: 0 0 auto;
  top: 7px;
  margin: auto;
`;

export const SCustomCard = styled(CustomCard)`
  padding: 16px 20px;
`;

export const SIFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - ${headerHeight}px);
  border: 0;
`;
