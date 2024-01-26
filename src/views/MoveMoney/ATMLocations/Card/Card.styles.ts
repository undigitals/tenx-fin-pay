import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MEDIA_SIZE, getColor } from 'utils/helpers/styleHelpers';

export const SCard = styled(CustomCard)`
  position: relative;
  padding: 16px 20px;

  .fee {
    min-width: auto;
    padding: 8px 16px;
    font-weight: 700;
    line-height: 16px;
  }

  .fee-green {
    background: ${getColor('green10')};
    border-color: ${getColor('green10')};
    color: ${getColor('green')};
    svg {
      color: ${getColor('green')};
    }
  }
  .fee-orange {
    background: ${getColor('orange10')};
    border-color: ${getColor('orange10')};
    color: ${getColor('orange')};
    svg {
      color: ${getColor('orange')};
    }
  }

  .open {
    font-weight: 600;
    color: ${getColor('green')};
  }
  .closed {
    font-weight: 600;
    color: ${getColor('red')};
  }

  .direction {
    min-width: auto;
    width: auto;
    border: none;
    padding: 0;
    font-size: 14px;
    font-weight: 700;
  }

  .info {
    position: relative;
    padding: 16px;
    margin-top: 8px;
    line-height: 16px;

    &.green {
      background-color: ${getColor('green10')};
      &:before {
        border-color: transparent ${getColor('green10')} transparent transparent;
      }
    }

    &.orange {
      background-color: ${getColor('orange10')};
      &:before {
        border-color: transparent ${getColor('orange10')} transparent transparent;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: -16px;
      right: 20px;
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 15px 15px 15px 0;
      display: block;
      vertical-align: middle;
      margin-right: 5px;
      transform: rotate(90deg);
    }

    @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
      max-width: 328px;
      border: 2px solid ${getColor('charcoal10')};
      padding: 20px 32px 20px 20px;
      position: absolute;
      z-index: 1000;
      bottom: calc(100% - 20px);
      right: 40px;

      &.green,
      &.orange {
        background-color: ${getColor('white')};
      }

      &:before {
        border-width: 0 0 0 0;
      }
    }
  }

  .closeBtn {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    padding: 24px 40px;
  }
`;

export const SWrapper = styled.div`
  &.hidden {
    display: none;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    .atm-inner {
      flex-direction: row;
      justify-content: space-between;

      div:nth-child(2) {
        min-width: 150px;
        justify-content: flex-end;
      }
    }

    .atm-bottom {
      margin-top: 4px;
    }
  }
`;

export const SLink = styled(Link)`
  min-width: auto;
  width: auto;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('blue')};
  &:hover {
    color: ${getColor('blue')};
  }
`;
