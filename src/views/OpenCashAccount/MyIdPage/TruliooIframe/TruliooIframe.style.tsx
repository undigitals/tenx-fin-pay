import styled from 'styled-components';
import { getDeviceHeaderSizes } from 'utils/helpers/uiHelpers';

const { headerHeight } = getDeviceHeaderSizes();

export const SIFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - ${headerHeight}px);
  border: 0;
`;
