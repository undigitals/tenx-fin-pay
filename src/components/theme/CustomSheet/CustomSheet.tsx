import React, { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { mobileApiCall } from 'services/mobileService';
import { useToggle } from 'utils/hooks/useToggle';
import { CustomSheetTitle } from './CustomSheetTitle';
import { ICustomSheetProps } from './CustomSheet.types';
import { SCloseIcon, SDialog, SDialogBody, SDialogHeader, SWrapper } from './CustomSheet.styles';

export const CustomSheet: React.FC<ICustomSheetProps> = ({
  id,
  isOpen = false,
  hasCloseIcon = true,
  onClose,
  children,
  title,
  subtitle,
  titleExtra,
  footer,
  header = true,
  height = 'fit-content',
  width,
  maxHeight,
  modalBottom,
  borderRadius,
  wrapperPadding = true,
  headerStyle = {},
  paddingBottom,
  paddingTop,
  padding,
  className,
}) => {
  const contentRef = useRef<HTMLDialogElement>(null);
  const theme = useTheme();
  const sheet = useToggle();

  useEffect(() => {
    const dialogElement = contentRef.current;
    if (sheet.isActive) {
      dialogElement?.showModal();
      mobileApiCall('backgroundChange', theme.blockingOverlay);
    } else {
      dialogElement?.close();
      mobileApiCall('backgroundChange', theme.blue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheet.isActive]);

  const handleClose = () => {
    sheet.hide();
    onClose?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleCloseSheet = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (event.target === contentRef.current && hasCloseIcon) {
      handleClose();
    }
  };

  useEffect(() => {
    sheet.toggle(isOpen);
  }, [isOpen]);

  return (
    <SDialog
      id={id}
      isDialogOpen={sheet.isActive}
      height={height}
      width={width}
      modalBottom={modalBottom}
      borderRadius={borderRadius}
      maxHeight={maxHeight}
      onKeyDown={handleKeyDown}
      className={className}
      onClick={handleCloseSheet}
      ref={contentRef}
      wrapperPadding={wrapperPadding}
    >
      <SWrapper>
        {header && title && (
          <SDialogHeader $headerStyle={headerStyle}>
            <CustomSheetTitle title={title} subtitle={subtitle} extra={titleExtra} />
            {hasCloseIcon && <SCloseIcon cursorPointer color="charcoal70" name="circleClose" onClick={handleClose} />}
          </SDialogHeader>
        )}
        {(!header || !title) && hasCloseIcon && <SCloseIcon cursorPointer color="charcoal70" name="circleClose" onClick={handleClose} />}

        <SDialogBody className="body" padding={padding} paddingBottom={paddingBottom} paddingTop={paddingTop}>
          {children}
        </SDialogBody>
        {footer && <footer>{footer}</footer>}
      </SWrapper>
    </SDialog>
  );
};
