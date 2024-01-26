import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import styled from 'styled-components';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import tenxDots from './images/tenxDots.svg';
import tenxRightDots from './images/tenxRightDots.svg';

interface ISStepCard {
  imageUrl: string;
}

export const SLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-image: url(${tenxRightDots});

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    background: ${getColor('cream70')};
    min-height: 100vh;
    justify-content: start;
    min-height: 100%;
  }
`;

export const SStepCard = styled(CustomCard)<ISStepCard>`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  background-image: url(${(props) => props.imageUrl}), url(${tenxDots});
  background-position: left bottom;
  background-repeat: no-repeat;

  button.primary {
    min-width: unset;
    padding: 7px 16px;
  }

  &.cash-account .custom-title-text {
    padding-right: 20px;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    background-image: unset;
    display: flex;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  }
`;

export const SCustomRow = styled(CustomRow)`
  flex-direction: column;
  align-items: start;
  margin-bottom: 34px;
  gap: 2%;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    flex-direction: row;
    align-items: unset;
  }
`;

export const SCustomButton = styled(CustomButton)`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    width: 240px;
  }
`;

export const SButtonWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
