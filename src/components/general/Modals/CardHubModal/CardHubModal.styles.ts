import styled from 'styled-components';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';

export const SCardHubModal = styled(CustomModal)`
  .ant-modal-close {
    position: absolute;
    top: 8px;
    right: -3px;
    color: transparent;
  }

  .ant-modal-content {
    border-radius: 25px;
    padding: 0 10px 0;
  }

  .ant-modal-body {
    padding: 0 0 18px;
    min-height: 90vh;
  }
`;

export const SIFrame = styled.iframe`
  width: 100%;
  min-height: calc(100vh - 165px);
  margin-top: 55px;
  border: 0;
`;
