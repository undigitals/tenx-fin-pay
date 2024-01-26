import Slider from 'react-slick';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SSlider = styled(Slider)`
  li {
    margin: 0;
  }

  .slick-dots {
    color: ${getColor('cream10')};
  }

  .slick-dots li.slick-active button:before {
    opacity: 1;
    color: ${getColor('blue')};
  }
`;

export const SCollapseButton = styled.button`
  outline: none;
  margin: 0;
  border: none;
  align-self: flex-end;
  background: none;
  white-space: nowrap;
`;

export const SContainer = styled.div`
  margin-bottom: 30px;
`;
