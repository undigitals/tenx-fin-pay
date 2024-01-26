import { Drawer } from 'antd';
import styled from 'styled-components';

export const SDrawer = styled(Drawer)`
  .ant-drawer {
    &-content {
      border-radius: 24px 24px 0px 0px;
    }

    &-body {
      ::-webkit-scrollbar {
        display: none !important;
      }

      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
  }
`;

export const SMaskStyle: React.CSSProperties = {
  background: 'rgba(53, 49, 49, 0.8)',
  backdropFilter: 'blur(4px)',
};
