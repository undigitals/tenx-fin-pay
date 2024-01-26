import styled, { css } from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { MEDIA_SIZE, getColor, mediaUpToHeight } from 'utils/helpers/styleHelpers';

export const SLayout = styled.div`
  max-width: 1096px;
  margin: 0 auto;
  height: 100%;
  .steps {
    display: flex;
    margin-bottom: 22px;
  }

  .footer {
    margin-top: 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${mediaUpToHeight(
      768,
      css`
        margin-bottom: 40px;
      `
    )}
  }

  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    .deposit-header {
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

    .heading .custom-text-inner {
      font-size: 24px;
      font-weight: 600;
    }

    .steps-list {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      gap: 24px;
    }

    .steps {
      max-width: 350px;
      padding: 20px;
      background: ${getColor('white')};
      border-radius: 25px;
      flex-direction: column;
      flex: 30%;
    }
    .footer button {
      max-width: fit-content;
      padding: 14px 40px;
    }
  }
`;

export const SArrowRight = styled(Icon).attrs({
  name: 'chevronRight',
  size: 'smallest',
  color: 'white',
})`
  margin-left: 20px;
`;

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${getColor('white')};
  margin-right: 17px;
  margin-left: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex: none;
  order: 0;
  flex-grow: 0;

  @media screen and (min-width: ${MEDIA_SIZE.minDesktop}px) {
    background: ${getColor('cream90')};
    margin-bottom: 24px;
  }
`;
