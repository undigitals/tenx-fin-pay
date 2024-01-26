import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  margin-bottom: 24px;

  .custom-title-text {
    font-size: 24px !important;
    margin-bottom: 0px !important;
  }
`;

export const SHeaderInnerWrapper = styled.div`
  padding: 1rem 0.75rem 0.2rem;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  background-color: ${getColor('white')};
  box-shadow: ${getColor('transparent')} 0 0 0 0, ${getColor('transparent')} 0 0 0 0, ${getColor('transparent1')} 0 1px 3px 0, ${getColor('transparent1')} 0 1px 2px -1px;
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
`;

export const SHeaderTopLine = styled.div`
  background-color: rgb(241 245 249 / 1);
  border-radius: 9999px;
  height: 5px;
  width: 3rem;
  margin: auto;
  top: 0.5rem;
  left: 0;
  right: 0;
  position: absolute;
`;

export const SLogoWrapper = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.75rem;
`;

export const SHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const SHeaderDotsMenuButton = styled.button`
  padding: 0.25rem;
  margin-right: 1rem;
  margin-left: auto;
  background-color: ${getColor('transparent')};
  line-height: 0;
  z-index: 10;
  &:hover {
    color: ${getColor('blue')};
  }
`;

export const SHeaderCloseButton = styled.button`
  padding: 0.25rem;
  line-height: 0;

  &:hover {
    color: ${getColor('blue')};
  }
`;

export const SMessagesHeader = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
  padding: 0 0 0.5rem 0.625rem;
  height: 6rem;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  svg {
    width: 3rem;
    height: 3rem;
  }
`;
