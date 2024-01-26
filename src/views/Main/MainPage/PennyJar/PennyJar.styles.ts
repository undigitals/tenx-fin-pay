import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import styled from 'styled-components';

export const SPennyJarCard = styled(CustomCard)`
  min-height: 168px;
  position: relative;
`;

export const SPennyJarLogo = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const SPennyJarDots = styled.img`
  max-width: 100%;
  width: auto;
  position: absolute;
  z-index: -9999;
  bottom: 0;
  left: 0;
`;

export const SAdd = styled(BodyText)`
  position: absolute;
  right: 6%;
  bottom: 14%;
`;

export const SCloseIcon = styled(Icon)`
  position: absolute;
  width: 8px;
  height: 8px;
  right: 0;
  top: 0;
  margin-top: 25px;
  margin-right: 25px;
`;
