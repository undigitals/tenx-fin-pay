import styled from 'styled-components';

export const SLayout = styled.ol`
  display: flex;
  align-items: center;
  padding: 0 60px;
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
