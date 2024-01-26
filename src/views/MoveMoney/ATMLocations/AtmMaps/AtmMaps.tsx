// import { IFrame } from 'components/general/IFrame/IFrame';
import React from 'react';
import { ICoordinates } from 'store/user/atmLocations/atmLocations.types';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { Icon } from 'components/general/Icon/Icon';
import { SIFrame } from './AtmMaps.styles';

interface IMapProps {
  coordinates: ICoordinates;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const AtmMaps: React.FC<IMapProps> = ({ coordinates, isOpen, setIsOpen }) => {
  const { latitude, longitude } = coordinates;
  const url = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`;

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <CustomModal
      open={isOpen}
      onCancel={handleClose}
      padding="0px"
      margin="0"
      isFullHeight
      isFullWidth
      closeIcon={<Icon name="close" size="small" color="blue" marginTop={16} marginLeft={16} />}
      bodyStyle={{ height: '75%' }}
    >
      <SIFrame src={url} />
    </CustomModal>
  );
};
