import styled from 'styled-components';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SCustomButton = styled(CustomButton)`
  white-space: normal;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    max-width: fit-content;
    margin: auto auto 0 auto;
  }
`;
