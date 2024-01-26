import styled from 'styled-components';

import { Carousel } from 'antd';
import { getColor } from 'utils/helpers/styleHelpers';

export const SCarousel = styled(Carousel)`
  margin-bottom: 56px;

  .slick-slide {
    padding-right: 0;
    padding-left: 26px;
  }

  @media only screen and (min-width: 1500px) {
    .slick-slide {
      padding-left: 29px;
    }
  }

  @media only screen and (max-width: 1200px) {
    .slick-slide {
      padding-left: 23px;
    }
  }

  @media only screen and (max-width: 920px) {
    .slick-slide {
      padding-left: 16px;
    }
  }

  .slick-dots {
    bottom: -40px;
    position: initial;
    margin-top: 16px;

    li {
      width: 6px !important;
      height: 6px !important;
      border-radius: 50px;
      margin-right: 8px;
      margin-left: 0;

      &:last-child {
        margin-right: 0;
      }
      button {
        width: 6px !important;
        height: 6px !important;
        background: #c2c1c1;
        border-radius: 50%;
      }
      &.slick-active button {
        background: ${getColor('blue')} !important;
      }
    }
  }
`;

export const ArrowsStyledBlocks = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
`;

export const ArrowsButton = styled.button`
  border: none;
  background: none;
`;

export const ArrowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
`;

export const STitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SSubTitle = styled.div`
  flex: 100%;
`;

export const SCollapseButton = styled.button`
  outline: none;
  margin: 0;
  border: none;
  align-self: flex-start;
  background: none;
`;
