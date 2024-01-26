import React from 'react';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { Loader } from 'components/general/Loader/Loader';
import { Icon } from 'components/general/Icon/Icon';
import { SIFrame } from './MoveMoneyMainPage.style';

interface IFrameModalProps {
  iFrameUrl: string;
  isIframeOpen: boolean;
  handleCloseIframe: () => void;
  iFrameIsLoading: boolean;
  setIFrameIsLoading: (value: boolean) => void;
}

export const IFrameModal: React.FC<IFrameModalProps> = ({ iFrameUrl, isIframeOpen, handleCloseIframe, iFrameIsLoading, setIFrameIsLoading }) => {
  return (
    <CustomModal
      open={isIframeOpen}
      onCancel={handleCloseIframe}
      padding="10px"
      topPosition="0"
      margin="0"
      isFullHeight
      isFullWidth
      closeIcon={<Icon name="close" size="small" color="blue" marginTop={16} marginLeft={16} />}
      bodyStyle={{ height: '100%' }}
    >
      {iFrameIsLoading && <Loader />}
      <SIFrame height="100%" onLoad={() => setIFrameIsLoading(false)} src={iFrameUrl} />
    </CustomModal>
  );
};
