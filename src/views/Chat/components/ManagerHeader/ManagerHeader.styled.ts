import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SHeaderManager = styled.header`
  padding: 16px 12px 28px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: ${getColor('white')};
  box-shadow: ${getColor('transparent')} 0 0 0 0, ${getColor('transparent')} 0 0 0 0, ${getColor('transparent1')} 0 1px 3px 0, ${getColor('transparent1')} 0 1px 2px -1px;

  .topContainer {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 8px;
    width: 100%;
  }

  .bottomContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px 8px;
    width: 100%;
  }

  .headerName {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  .accountType {
    font-size: 12px;
    line-height: 16px;
    color: ${getColor('independence')};
    padding-top: 4px;
  }

  button {
    height: 28px;
    width: 28px;
    background-color: ${getColor('royalblue3')};
    color: ${getColor('blue')};
    margin-right: 8px;
    transition: 0.3s;
    border-radius: 999px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: ${getColor('white')};
      background-color: ${getColor('royalblue2')};
    }

    & > svg {
      height: 16px;
      width: 16px;
    }

    &.leaveButton {
      height: auto;
      width: auto;
      padding: 4px 12px;
      background-color: ${getColor('royalblue1')};
      margin-left: auto;
      border-radius: 16px;
      color: ${getColor('blueberry')};
      font-size: 14px;
      line-height: 20px;
      border: none;
    }
  }
`;
