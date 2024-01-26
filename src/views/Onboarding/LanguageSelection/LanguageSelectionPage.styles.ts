import styled from 'styled-components';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import tenxDots from './images/tenxDots.svg';
import tenxLeftDots from './images/tenxLeftDots.svg';
import tenxRightDots from './images/tenxRightDots.svg';

export const SLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${getColor('blue')};
  background-image: url(${tenxDots});

  background-position: center;
  background-repeat: no-repeat;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    background-image: url(${tenxRightDots}), url(${tenxLeftDots});
    background-position: right bottom, left top;
    background-repeat: no-repeat, no-repeat;
  }

  .languageSelectionFooter {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-wrap: wrap;
    gap: 44px; 
    margin-top: 48px; 
    margin bottom: 50px;
  }
`;

export const SActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  max-width: 85%;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    position: initial;
  }
`;

export const SImage = styled.img`
  position: relative;
  bottom: 50px;
  max-width: 85%;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    position: absolute;
    top: 40px;
    max-width: 170px;
  }
`;

export const SLanguageButton = styled(CustomButton)`
  background-color: ${getColor('cream')};
  border: none;
  width: 112px;
  height: 44px;
  padding: 14px 24px;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;
