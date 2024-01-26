import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SCustomDivider = styled.div`
  border-top-width: 1px;
  border-top-style: dashed;
  border-top-color: ${getColor('charcoal20')};
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  width: 100%;
`;
