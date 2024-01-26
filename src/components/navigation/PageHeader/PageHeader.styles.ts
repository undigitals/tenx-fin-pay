import styled, { css } from 'styled-components/macro';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';
import { getDeviceHeaderSizes } from 'utils/helpers/uiHelpers';

const RIGHT_BTN_SIZE = 30;
const LEFT_BTN_SIZE = 40;

const { headerHeight } = getDeviceHeaderSizes();

export const SHeaderBar = styled.header`
  position: relative;
  top: 0;
  left: 0;
  flex: 0 0 auto;
  width: 100%;
  background-color: ${getColor('blue')};
  display: flex;
  align-items: flex-end;
  height: ${headerHeight}px;
  justify-content: space-between;
  margin: 0;
  padding: 0 0 12px;
  z-index: 999;
`;

export const SRightButtons = styled.div`
  display: flex;
  vertical-align: center;
  position: relative;
  right: 20px;
  padding: 5px;
`;

export const SHeaderRightBtn = styled.button<any>`
  width: 100%;
  height: ${RIGHT_BTN_SIZE}px;
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  position: relative;

  ${({ marginRight, extraStyles }) => css({ marginRight, ...extraStyles })};

  .notifications {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12px;
    width: 14px;
    border: 2px solid ${getColor('white')};
    border-radius: 7px;
    background-color: ${getColor('red')};
    font-size: 6px;
    font-weight: 400;
    font-family: 'DM Sans';
    color: ${getColor('white')};
    top: 0;
    right: 0;
  }

  .point {
    position: absolute;
    height: 4px;
    width: 4px;
    border-radius: 2px;
    background-color: ${getColor('white')};
    bottom: -4px;
    left: 9px;
  }
`;

export const SHeaderLeftBtn = styled(SHeaderRightBtn)`
  width: ${LEFT_BTN_SIZE}px;
  height: ${LEFT_BTN_SIZE}px;
  background: transparent;
  margin-right: 2px;
  padding: 0;
`;

interface ISLeftBtnContainer {
  isWhiteOutline?: boolean;
}

export const SLeftBtnContainer = styled.div<ISLeftBtnContainer>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  ${mediaUpTo(
    400,
    css`
      padding-right: 35px;
    `
  )}
`;
