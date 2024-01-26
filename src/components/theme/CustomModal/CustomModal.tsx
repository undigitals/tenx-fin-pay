import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { mobileApiCall } from 'services/mobileService';
import { SBodyStyle, SIconClose, SMaskStyle, SModal } from './CustomModal.styles';
import { ICustomModalProps } from './CustomModal.types';

export const CustomModal: React.FC<ICustomModalProps> = ({
  display = 'block',
  children,
  maskStyle,
  bodyStyle = {},
  closeIcon,
  centered = true,
  destroyOnClose = true,
  footer = null,
  topPosition = '25%',
  bottomPosition = 'auto',
  padding = '24px',
  margin,
  isFullWidth = false,
  isFullHeight = false,
  open,
  closeIconColor,
  contentHeight,
  onCancel,
  onClose,
  closable,
  ...props
}) => {
  const theme = useTheme();

  const handleAfterClose = () => {
    mobileApiCall('backgroundChange', theme.blue);
  };

  const fullWidthSettings = isFullWidth
    ? {
        left: 0,
        width: 100,
      }
    : {};

  const stickToBottomSettings = {
    width: '100%',
    left: 0,
  };

  useEffect(() => {
    if (open) {
      mobileApiCall('backgroundChange', theme.blockingOverlay);
    }
  }, [open]);

  return (
    <SModal
      {...props}
      open={open}
      maskStyle={SMaskStyle}
      bodyStyle={{ ...SBodyStyle, ...bodyStyle }}
      closable={closable}
      closeIcon={closeIcon || <SIconClose display={display} color={closeIconColor} />}
      centered={centered}
      destroyOnClose={destroyOnClose}
      footer={footer}
      style={{
        top: `${topPosition}`,
        bottom: `${bottomPosition}`,
        height: `${isFullHeight ? '100%' : ''}`,
        maxWidth: `${isFullWidth ? '100%' : ''}`,
        ...fullWidthSettings,
        ...stickToBottomSettings,
      }}
      padding={padding}
      margin={margin}
      isFullWidth={isFullWidth}
      contentHeight={contentHeight}
      afterClose={handleAfterClose}
      onCancel={onClose || onCancel}
    >
      {children}
    </SModal>
  );
};
