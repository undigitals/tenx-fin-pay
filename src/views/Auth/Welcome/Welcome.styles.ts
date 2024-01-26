import styled from 'styled-components';
import { images } from 'assets';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { TenxLogo } from 'components/general/TenxLogo/TenxLogo';

export const STenxLogo = styled(TenxLogo)`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    position: absolute;
    top: 40px;
    max-width: 170px;
  }
`;

export const SCustomButton = styled(CustomButton)`
  width: 200px;
  @media screen and (max-width: ${MEDIA_SIZE.tablet - 1}px) {
    background-color: ${getColor('cream')};
    width: 100%;
  }
`;

export const SWelcomeLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${getColor('blue')};
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    background-color: ${getColor('blue5')};
  }
`;

export const SWelcomeBackgroundImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(${images.dotpattern});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    background-image: url(${images.dotPatternRightBlue}), url(${images.dotPatternLeftBlue});
    background-position: right bottom, left top;
    background-repeat: no-repeat, no-repeat;
  }
`;

export const SWelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 165px 30px 70px;
  & svg {
    width: 200px;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    justify-content: center;
    width: 80%;
    align-items: center;
  }
`;

export const SWelcomeParagraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  margin: 0;
  margin-bottom: 60px;

  .welcomeTitleWrapper {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    justify-content: center;
  }
`;
