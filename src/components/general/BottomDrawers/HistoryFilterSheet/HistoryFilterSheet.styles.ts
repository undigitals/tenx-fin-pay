import styled from 'styled-components';
import React from 'react';
import { Drawer } from 'antd';
import { getColor, getProp, ifProp } from 'utils/helpers/styleHelpers';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';

interface ISOutlinedCard {
  cursorPointer?: boolean;
  padding?: string;
}

export const SCustomSheet = styled(CustomSheet)`
  padding: 24px 24px 60px;
`;

export const SCustomRow = styled(CustomRow)`
  display: contents;
`;

export const SLineSeparator = styled.div`
  border: 1px solid ${getColor('charcoal20')};
  width: 7%;
  margin: 0 10px;
`;

export const SInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & .input-status-undefined {
    min-width: 45%;
    & svg {
      width: 30px;
      height: 30px;
    }
  }

  & .ant-form-item {
    margin-bottom: 0;
  }
`;

export const SOutlinedCard = styled.div<ISOutlinedCard>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 16px 0;
  padding: ${getProp('padding', '18px 24px')};
  border: 2px solid ${getColor('charcoal5')};
  border-radius: 20px;
  cursor: ${ifProp('cursorPointer', 'pointer', 'default')};

  .ant-form-item {
    margin: 0;
  }
`;

export const SDrawer = styled(Drawer)`
  .ant-modal-content {
    border-radius: 20px;
    opacity: 1;
    margin: 0 20px;
    box-shadow: none;
    padding: 45px 24px 24px;
  }

  .ant-modal-body {
    ::-webkit-scrollbar {
      display: none !important;
    }

    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  .ant-modal-wrap {
    top: 48% !important;
  }
`;

export const SMaskStyle: React.CSSProperties = {
  background: 'rgba(53, 49, 49, 0.8)',
  backdropFilter: 'blur(4px)',
};

export const SBodyStyle: React.CSSProperties = {
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 150px)',
  padding: 0,
};

export const SDateInputStyle: React.CSSProperties = {
  border: '0',
};

export const SContentWrapperStyle: React.CSSProperties = {
  borderRadius: '24px 24px 0px 0px',
};
