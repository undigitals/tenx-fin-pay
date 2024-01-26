import styled from 'styled-components';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomTitle } from 'components/theme/CustomTitle/CustomTitle';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { Icon } from 'components/general/Icon/Icon';
import { getColor } from 'utils/helpers/styleHelpers';

export const SPayeeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SPayeeTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
`;

export const SRadioButton = styled(RadioButton)`
  > div:first-child {
    background: ${getColor('white')};
    border-radius: 25px;
    padding: 21px;
    width: auto;
  }
`;

export const SCustomCard = styled(CustomCard)`
  > * {
    font-family: 'DM Sans' !important;
  }
`;

export const SPayeeValue = styled(CustomText)`
  margin-right: 16px;
`;

export const SCustomText = styled(CustomText)`
  max-width: 172px;
`;

export const SIcon = styled(Icon)`
  margin-right: 11px;
`;

export const SCustomValue = styled(CustomTitle)`
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 0;
`;
