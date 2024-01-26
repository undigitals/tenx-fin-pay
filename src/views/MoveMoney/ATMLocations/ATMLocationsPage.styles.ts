import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import styled from 'styled-components';
import { MEDIA_SIZE, getColor } from 'utils/helpers/styleHelpers';

export const SCustomButton = styled(CustomButton)`
  border-color: ${getColor('creamS10')};
  background-color: transparent;
  color: ${getColor('charcoal70')};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  width: auto;
  padding: 8px 16px;

  &.noBorder {
    border-color: transparent;
    padding: 0;
  }

  &.active {
    border-color: ${getColor('blue')};
    background-color: ${getColor('blue')};
    color: ${getColor('white')};
  }
`;

export const SDisclosure = styled.div`
  margin-top: auto;
  margin-bottom: 48px;
`;

export const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;

  .locations {
    margin-bottom: 48px;
  }
`;

export const SContentWrapper = styled.div`
  width: 100%;
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    max-width: 876px;
    margin: 0 auto 32px;
  }
`;

export const SAddressCard = styled(CustomCard)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  margin-top: 48px;
  padding: 16px 40px;
`;

export const SCustomCard = styled(CustomCard)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${getColor('charcoal10')};

  .body-text {
    margin-right: auto;
    margin-left: 16px;
  }
`;

export const SRadioButton = styled(RadioButton)`
  display: block;
  margin-bottom: 24px;
`;
