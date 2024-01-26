import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SSelector = styled.div`
  width: 100%;
  position: relative;
  background: ${getColor('white')};
  border-radius: 16px;
  border: 2px solid ${getColor('charcoal10')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  height: 56px;

  color: ${getColor('charcoal40')};
  font-size: 16px;
  font-weight: 400;

  .content {
    display: flex;
    justify-content: flex-start;
  }
`;

export const SContent = styled.div`
  background: ${getColor('white')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  top: 55px;
  right: 0;
  border-radius: 20px;
  position: absolute;
  cursor: pointer;
  border: 2px solid ${getColor('charcoal10')};
  box-shadow: 0px 4px 32px 0px rgba(64, 57, 48, 0.08);
  max-height: 220px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  > :first-child:last-child {
    :hover {
      border-radius: 20px;
      background: ${getColor('blue10')};
      border: 2px solid ${getColor('blue')};
    }
  }

  > :first-child {
    :hover {
      border-radius: 20px 20px 0 0;
    }
  }

  > :last-child {
    :hover {
      border-radius: 0 0 20px 20px;
    }
  }

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 20px;
    width: 100%;

    :hover {
      border: 2px solid ${getColor('blue')};
      background: ${getColor('blue10')};
    }

    .name-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: start;
      justify-content: center;
      margin-left: 10px;

      .account-name {
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        color: ${getColor('charcoal')};
      }

      .account-nickname {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: ${getColor('charcoal70')};
      }
    }
  }
`;
