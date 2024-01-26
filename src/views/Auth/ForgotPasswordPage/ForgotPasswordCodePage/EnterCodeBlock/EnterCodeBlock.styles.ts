import styled from 'styled-components/macro';
import { MEDIA_SIZE, ifProp } from 'utils/helpers/styleHelpers';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';

export const SLayout = styled.div<{ isDesktopSize: boolean }>`
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${ifProp('isDesktopSize', 'column', 'row')};
    gap: 5px;
    flex-wrap: wrap;
  }
`;

export const SButtonWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const SCustomButton = styled(CustomButton)`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    width: 160px;
  }
`;
