import styled, { css } from 'styled-components';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';
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

export const SCustomCard = styled(CustomCard)`
  padding: 21px 20px;

  ${mediaUpTo(
    400,
    css`
      padding: 15px 20px;
    `
  )}
`;

export const SIFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - ${headerHeight}px);
  border: 0;
`;
