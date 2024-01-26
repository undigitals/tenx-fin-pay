import styled from 'styled-components';
import { getDeviceHeaderSizes } from 'utils/helpers/uiHelpers';

const { headerHeight } = getDeviceHeaderSizes();

export const Container = styled.div`
  width: 100%;
  max-height: calc(100vh - ${headerHeight}px);
  border: 0;
`;
