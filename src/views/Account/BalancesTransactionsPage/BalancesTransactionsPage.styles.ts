import styled from 'styled-components/macro';
import { getColor } from 'utils/helpers/styleHelpers';

export const SPage = styled.div<{ isDesktopSize?: boolean }>`
  display: flex;
  min-height: 100%;
  padding: ${({ isDesktopSize }) => (isDesktopSize ? '0' : '0 4px 68px')};
`;

export const SMainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  width: 100%;
  margin-bottom: 1rem;
  padding-top: 35px;

  section.group {
    margin-top: 15px;

    h2 {
      font-size: 12px;
      font-weight: 400;
      color: ${getColor('charcoal')};
      margin-bottom: 16px;
    }

    ul {
      list-style: none;
      padding: 15px;
      background-color: ${getColor('white')};
      border-radius: 24px;
    }

    li {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const STransactionSign = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${getColor('charcoal5')};

  .arrow {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
    bottom: -3px;
    right: -3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid ${getColor('white')};

    &:before {
      content: '';
      position: relative;
      width: 6px;
      height: 1px;
      background: ${getColor('white')};
    }

    &:after {
      content: '';
      position: relative;
      width: 4px;
      height: 4px;
      border: 1px solid ${getColor('white')};
      border-top: none;
      border-right: none;
      transform: rotate(45deg);
    }

    &.income {
      background: ${getColor('green')};
      &:after {
        margin-left: -10px;
        transform: rotate(-136deg);
      }
    }

    &.expense {
      flex-direction: row-reverse;
      background: ${getColor('red')};
      &:after {
        margin-right: -10px;
        transform: rotate(45deg);
      }
    }
  }
`;

export const STransaction = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;

  .description {
    flex-grow: 1;
    margin-left: 10px;
    font-weight: 600;
    color: ${getColor('black')};
    font-size: 14px;
  }

  .amount {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-end;
  }
`;
