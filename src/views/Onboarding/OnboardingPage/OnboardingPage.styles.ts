import styled, { css } from 'styled-components/macro';
import { Carousel } from 'antd';
import { getColor, mediaUpTo, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { motion } from 'framer-motion';

export const SLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background: ${getColor('cream70')};
  padding-top: 36px;
`;

export const Top = styled.div`
  flex: 0 0 auto;
`;

export const SCarouselWrapper = styled(Carousel)`
  margin-bottom: 10px;

  > .slick-dots {
    position: relative;
    margin-top: 40px;
  }
  > .slick-dots li.slick-active {
    width: 0;
  }

  > .slick-dots li {
    width: 0;
    margin: 0 8px;
    & button {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${getColor('charcoal60')};
      opacity: 0.4;
    }
  }

  > .slick-dots li button {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${getColor('charcoal60')};
    opacity: 0.4;
  }

  > .slick-dots li.slick-active button {
    width: 6px;
    height: 6px;
    opacity: 1;
    background: ${getColor('blue')} !important;
  }

  .financial-wellness-header,
  .cash-account-header {
    ${mediaUpTo(
      415,
      css`
        margin-top: 0 !important;
        margin-bottom: 38px !important;
      `
    )}
  }

  .cash-account-header > .title {
    padding-right: 30px;
  }

  .tenx-pay-header {
    margin-bottom: 50px !important;
    margin-top: 18px;
    ${mediaUpTo(
      415,
      css`
        margin-top: 0 !important;
        margin-bottom: 45px !important;
      `
    )}

    ${mediaUpTo(
      'mobile',
      css`
        margin-bottom: 38px !important;
      `
    )}
  }
`;

export const SActions = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SContinueBtnWrapper = styled.div`
  width: 100%;
  padding: 0 24px;
`;

export const SLearnMoreTextWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0 15px;

  ${mediaUpTo(
    'mobile',
    css`
      margin: 15px 0 10px;
    `
  )}
`;

export const SCustomRow = styled(CustomRow)`
  margin-bottom: 34px;
  gap: 2%;
  flex-direction: row;
  align-items: unset;
`;

export const SCustomButton = styled(CustomButton)`
  margin-bottom: 16px;
  margin-top: 32px;
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    width: 130px;
    margin-top: 0;
  }
`;

export const SButtonWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
