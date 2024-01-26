import styled, { css } from 'styled-components';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';

const BasicStyles = css`
  font-weight: 500;
  font-size: 12px;
  font-family: 'Poppins';
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 14px 24px;
  height: 36px;
`;

export const SContainer = styled.div`
  height: 100%;

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    ${BasicStyles}
    color: ${getColor('white')};
    background: ${getColor('blue')};
  }

  .ant-tabs-tab .ant-tabs-tab-btn {
    ${BasicStyles}
    color: ${getColor('blue')};
    border: 2px solid ${getColor('blue')};
    background: transparent;
  }

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${getColor('charcoal')};
      background: transparent;
      border: 0;
      border-bottom: 1px solid ${getColor('blue')};
      background: transparent;
      border-radius: 0;
    }

    .ant-tabs-tab .ant-tabs-tab-btn {
      color: ${getColor('charcoal')};
      border: 0;
    }
  }

  .ant-tabs {
    height: 100%;
    .ant-tabs-content-holder > .ant-tabs-content {
      height: 100%;
      .ant-tabs-tabpane {
        height: 100%;
      }
    }

    &-ink-bar {
      background-color: transparent;
    }

    &-tab:hover {
      color: ${getColor('black')};
    }

    &-nav-operations {
      display: none !important;
    }

    &-top {
      margin-top: -25px;

      > .ant-tabs-nav .ant-tabs-nav-wrap {
        :before {
          box-shadow: none;
        }

        :after {
          box-shadow: none;
        }
      }

      .ant-tabs-nav:before {
        border-bottom: none !important;
      }
    }

    &-tab {
      margin: 0 5px 0 5px;
    }

    &-nav {
      margin-left: -15px;
      margin-right: -15px;
    }
  }
`;
