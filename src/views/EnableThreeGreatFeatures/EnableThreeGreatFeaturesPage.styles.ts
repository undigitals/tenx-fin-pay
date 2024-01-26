import styled from 'styled-components';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between;

  .disclaimer {
    margin-bottom: 40px;
    margin-left: 0px;

    @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
      width: 370px;
      margin-bottom: 25px;
      margin-left: 30px;
    }
  }
`;

export const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SFeaturesList = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 24px;
    flex-direction: row;
    flex-wrap: nowrap;
    div {
      max-width: 350px;
    }
  }
`;

export const SCustomButton = styled(CustomButton)`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    width: unset;
  }
`;
