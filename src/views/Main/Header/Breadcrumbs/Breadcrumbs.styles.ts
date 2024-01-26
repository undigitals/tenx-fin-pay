import styled, { css } from 'styled-components';
import { ifProp, getColor } from 'utils/helpers/styleHelpers';

export const SWrapper = styled.div<{ hasMarginLeft?: boolean }>`
  ${ifProp(
    'hasMarginLeft',
    css`
      padding-left: 62px;
      margin-bottom: 42px;
      padding-bottom: 25px;
      border-bottom: 1px solid ${getColor('creamS5')};
    `
  )};
`;

export const SLayout = styled.ol<{ noPadding?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${ifProp('noPadding', '0', '0 60px')};
  list-style-type: none;

  li {
    display: flex;
    flex: 0 0 auto;
    white-space: nowrap;

    .icon {
      display: inline-block;
    }
  }

  a {
    color: inherit;
    &:hover {
      color: inherit;
    }

    &[aria-current='page'] {
      cursor: default;
    }
  }
`;
