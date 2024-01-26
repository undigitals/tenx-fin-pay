import styled from 'styled-components/macro';
import { MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SSuccessImageBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button.primary {
    width: 100%;
    margin-top: 50px;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    width: 100%;

    button.primary {
      width: 390px;
    }
  }

  .success-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 162px;
    position: relative;
    margin: 25px 0 25px;
    margin-left: 35px;
    @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
      margin-left: 3%;
    }
  }
`;
