import styled from 'styled-components';
import { getProp } from 'utils/helpers/styleHelpers';

export const SIFrame = styled.iframe`
  min-height: 600px;
  width: 100%;
  margin-top: 10px;
  height: ${getProp('height', 'auto')};
  border: 0;
`;
