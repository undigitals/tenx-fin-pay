import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';
import { chevronDown } from 'assets/icons';

export const SCustomDetails = styled.details`
  --detailsContentHeight: auto;
  padding: 24px;
  border-radius: 20px;
  background-color: ${getColor('white')};

  summary {
    display: flex;
    align-items: center;
    color: ${getColor('charcoal')};
    cursor: pointer;
    list-style: none;

    span {
      flex-grow: 1;
    }

    &::after {
      content: '';
      width: 24px;
      aspect-ratio: 1;
      mask: url(${chevronDown}) no-repeat center;
      background-color: ${getColor('charcoal')};
    }
    ::-webkit-details-marker {
      display: none;
    }
  }

  &.with-icon summary::before {
    content: '';
    width: 24px;
    min-width: 24px;
    aspect-ratio: 1;
    margin-right: 16px;
    mask: var(--summaryIconURL) no-repeat 0 / contain;
    background-color: ${getColor('charcoal70')};
  }

  &.open {
    summary::after {
      transform: rotate(180deg);
    }

    & > div {
      height: var(--detailsContentHeight);
    }
  }

  & > div {
    height: 0;
    overflow: hidden;
    transition: height 200ms;
  }

  .content {
    padding-top: 25px;
  }
`;
