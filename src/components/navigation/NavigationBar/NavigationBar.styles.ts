/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { MEDIA_SIZE, getColor } from 'utils/helpers/styleHelpers';

export const SIcon = styled(Icon)`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
  }
`;

export const SNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 24px 24px;
  min-width: 108px;
  padding: 24px;
  position: relative;
  background-color: ${getColor('white')};
  border-radius: 16px;

  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 6px;
    padding-block: 16px;
    text-align: center;
    color: ${getColor('charcoal')};
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;

    &::before {
      position: absolute;
      display: block;
      left: 0;
      content: '';
      width: 2px;
      height: 24px;
      background: ${getColor('transparent')};
      margin-top: 8px;
    }
  }

  & > a.active {
    color: ${getColor('blue')};

    &::before {
      background: ${getColor('blue')};
    }
  }

  .custom-row {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
    margin-top: auto;

    .custom-text-inner {
      margin-left: 0;
      font-size: 10px;
      font-weight: 500;
      margin-top: 8px;
    }
  }

  .overlay {
    position: absolute;
    top: -24px;
    left: 100%;
    bottom: 0;
    height: calc(100% + 48px);
    width: 10000%;
    background-color: rgba(123, 117, 93, 0.12);
    backdrop-filter: blur(8px);
    z-index: 900;
    &.hide {
      display: none;
    }
  }

  .menu-popup {
    position: absolute;
    left: calc(100% + 8px);
    top: 15%;
    z-index: 1000;
    padding: 8px 0;
    min-width: 250px;

    &.hide {
      display: none;
    }
  }

  .subMenu {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      padding: 12px 24px;
      a {
        
        font-family: DM Sans;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
        color: ${getColor('charcoal')};
        white-space: nowrap;
      }
    }
  }
}

  @media screen and (max-width: ${MEDIA_SIZE.tablet - 1}px) {
    position: fixed;
    top: unset;
    left: 0;
    bottom: 0;
    z-index: 999;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 98px;
    padding: 0;
    background: linear-gradient(0deg, rgba(251, 247, 239, 0.2), rgba(251, 247, 239, 0.2)), rgba(255, 255, 255, 0.8);
    border-top: 1px solid ${getColor('creamS5')};
    border-right: none;
    backdrop-filter: blur(12px);
    margin: 0;
    border-radius: 0;

    &.shadow::before {
      content: '';
      z-index: -1;
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #f3ebdb 0%, #f9f4e8 100%);
      transform: translate3d(0px, -5px, 0) scale(1);
      filter: blur(52px);
      opacity: var(0.38);
      transition: opacity 0.3s;
      border-radius: inherit;
    }

    &.shadow::after {
      content: '';
      z-index: -1;
      position: absolute;
      inset: 0;
      background: inherit;
      border-radius: inherit;
    }

    & > a {
      flex-direction: column;
      flex: 1;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      font-size: 10px;
      font-weight: 500;
      color: ${getColor('charcoal70')};

      &::before {
        position: static;
        content: '';
        width: 4px;
        height: 4px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: ${getColor('transparent')};
        margin-top: 0;
      }

      &::after {
        display: none;
      }

      svg {
        margin-right: 0;
      }
    }
  }
`;
