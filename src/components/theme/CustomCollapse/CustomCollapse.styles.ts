import styled, { css } from 'styled-components';
import { getColor, ifProp } from 'utils/helpers/styleHelpers';

export const SCollapseWrapper = styled.div`
  .custom-collapse {
    background: ${getColor('transparent')};
  }
  .ant-collapse-item {
    background: ${getColor('white')};
    padding: 0 24px;
    border-radius: 20px !important;

    &:not(:last-child) {
      margin-bottom: 16px;
      border-bottom: none;
    }
  }
  .ant-collapse-content-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .ant-collapse-item .ant-collapse-header {
    background: ${getColor('white')};
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .ant-collapse-item-active .ant-collapse-header {
    border: 2px solid ${getColor('white')};
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid ${getColor('charcoal5')};
  }

  .ant-collapse-content-box {
    padding: 20px 0 24px;
  }
`;

interface ISExpandIcon {
  isActive?: boolean;
}

export const SExpandIcon = styled.div<ISExpandIcon>`
  justify-content: center;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid ${getColor('charcoal10')};
  margin-right: 10px;
  position: relative;

  ${ifProp(
    'isActive',
    css`
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-4px, -4px);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${getColor('blue')};
        z-index: 150;
      }
    `
  )}
`;
