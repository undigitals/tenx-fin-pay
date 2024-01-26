import styled, { css } from 'styled-components/macro';
import { getProp, getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

interface ISFields {
  borderRadius?: string;
}

export const SCodesBlock = styled.div<ISFields>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: ${getProp('borderRadius', '7px')};
  border: 2px solid ${getColor('charcoal10')} !important;
  padding: 0 10px;
  touch-action: pan-y;
  ${mediaUpTo(
    340,
    css`
      gap: 0px;
    `
  )}
`;
