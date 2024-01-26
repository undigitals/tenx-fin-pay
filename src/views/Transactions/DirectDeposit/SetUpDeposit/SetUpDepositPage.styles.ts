import styled from 'styled-components';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { MEDIA_SIZE, getColor } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  max-width: 1096px;
  margin: 0 auto;
  .autodeposit-footer {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 37px;
    margin-bottom: 36px;
    align-items: center;
  }

  .deposit-header {
    @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 130px;
      justify-content: space-between;

      .custom-title-text {
        max-width: 760px;
        font-size: 32px;
      }
    }
  }

  .options {
    @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
      gap: 16px;
      display: flex;
      margin-top: 30px;
    }
  }

  .listItem {
    display: flex;
    margin-bottom: 24px;
    gap: 16px;
    justify-content: flex-start;
  }

  .centerImage {
    height: 219px;
    margin-bottom: 20px;
  }
`;

export const SCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${getColor('blue5')};

  font-family: DM Sans;
  font-size: 16px;
  font-weight: 700;
  color: ${getColor('blue')}; ;
`;

export const SDivider = styled.div`
  height: 2px;
  width: 100%;
  background: ${getColor('cream5')};

  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    min-width: 30px;
    background: ${getColor('creamS5')};
  }
`;

export const SBodyText = styled(BodyText)`
  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    display: none;
  }
`;
export const SBodyTextDT = styled(BodyText)`
  display: none;
  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    display: block;
  }
`;

export const SCustomCard = styled(CustomCard)`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    display: flex;
    flex-direction: column;

    button {
      max-width: fit-content;
      margin: auto auto 0 auto;
    }
  }
`;

export const SWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    gap: 16px;
    display: flex;
  }
`;
export const SDetailsWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    display: flex;
    justify-content: space-between;
    gap: 130px;

    .details-header {
      max-width: 480px;

      div:nth-child(1) > div {
        font-size: 24px;
      }
      div:nth-child(2) > div {
        font-size: 14px;
      }
    }

    .data-list {
      width: 480px;
    }
  }
`;
