import { images } from 'assets';
import styled from 'styled-components/macro';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { getColor } from 'utils/helpers/styleHelpers';

export const SContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const SAddressDataBlock = styled.div`
  .diff.original {
    background-color: ${getColor('charcoal10')};
  }

  .diff.suggested {
    background-color: ${getColor('gold50')};
  }
`;

export const SWarningImage = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  background-color: ${getColor('white')};
  background: url(${images.errorExclamationMarkImage}) no-repeat center / contain;
`;

export const SCustomButton = styled(CustomButton)`
  font-size: 16px;
  padding: 12px 25px;
  @media only screen and (max-width: 420px) {
    font-size: 15px;
    padding: 11px 5px;
  }
`;
