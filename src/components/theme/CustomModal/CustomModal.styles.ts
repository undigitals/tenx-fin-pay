import { Modal } from 'antd';
import styled, { css } from 'styled-components';
import { Icon } from 'components/general/Icon/Icon';
import { getColor, getProp, ifProp } from 'utils/helpers/styleHelpers';
import { ISModal } from './CustomModal.types';

export const SModal = styled(Modal)<ISModal>`
  ${ifProp(
    'isStickedToBottom',
    css`
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100% !important;
      margin: 0;
    `
  )}

  .ant-modal-content {
    border-radius: 20px;
    opacity: 1;
    margin: ${getProp('margin', '0 12px')};
    box-shadow: none;
    padding: ${getProp('padding', '24px')};
    height: ${getProp('contentHeight', 'inherit')};
    ${ifProp(
      'isFullWidth',
      css`
        width: 100%;
      `
    )}

    ${ifProp(
      'isStickedToBottom',
      css`
        border-radius: 20px 20px 0 0;
      `
    )}
  }

  .ant-modal-mask {
    -webkit-backdrop-filter: blur(4px) !important;
  }

  .ant-modal-body {
    display: ${getProp('display', 'flex')};
    flex-direction: column;
    ::-webkit-scrollbar {
      display: none !important;
    }

    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  .ant-modal-close {
    z-index: 1000;
  }

  .ant-modal-wrap {
    top: 48% !important;
  }

  .ant-modal-close {
    z-index: 10000;
  }

  .subscribe-image {
    margin-top: 4px;
    margin-inline: auto;
  }
`;

export const SIconClose = styled(Icon).attrs((props) => ({
  name: 'closeCircle',
  cursorPointer: true,
  display: props.display,
}))`
  position: absolute;
  min-width: 25px;
  min-height: 25px;
  top: 12px;
  right: 12px;
  z-index: 1000;

  ${({ color }) => css`
    color: ${getColor(color ?? 'blue')};
  `};
`;

export const SMaskStyle: React.CSSProperties = {
  background: 'rgba(0, 0, 0, 0.9)',
  backdropFilter: 'blur(4px)',
};

export const SBodyStyle: React.CSSProperties = {
  padding: 0,
};
