import styled from 'styled-components';
import { Drawer } from 'antd';

export const SOutlinedCard = styled.div`
  margin: 8px 0 16px 0;
  padding: 24px;
  border: 2px solid #f5f4f4;
  border-radius: 20px;
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
