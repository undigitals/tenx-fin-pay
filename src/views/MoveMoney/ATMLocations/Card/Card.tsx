import React, { useState } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Title, BodyText } from 'components/general/Typography';
import { IATMLocations } from 'store/user/atmLocations/atmLocations.types';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { useTranslation } from 'react-i18next';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { SCard, SLink, SWrapper } from './Card.styles';

interface ICardProps {
  data: IATMLocations;
  lat: number | undefined;
  long: number | undefined;
}

export const Card: React.FC<ICardProps> = ({ data, lat, long }) => {
  const { isDesktopSize } = useDeviceDimension();
  const { t } = useTranslation();
  const { placeName, properties, address, score, coordinates } = data.location;
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const noFeeProp = properties.find((prop) => prop.name === 'NO_ATM_ACCS_FEE_IND');

  const getAddress = () => {
    if (address.formattedAddress) {
      return address.formattedAddress;
    }

    return properties.find((p) => p.name === 'LocationDescription')?.value;
  };

  const getUrl = () => {
    let url;
    if (isIOS) {
      url = `http://maps.apple.com/?daddr=${address.street2 || address.street},${address.city},${address.state},&dirflg=d&t=m`;
    } else {
      url = `http://maps.google.com/maps?saddr=${lat},${long}&daddr=${coordinates.latitude},${coordinates.longitude}`;
    }
    return url;
  };

  const showInfo = () => {
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    setIsInfoOpen(false);
  };

  return (
    <SCard marginBottom={16} className="atm-card">
      <CustomRow className="atm-header" gap={10}>
        <Title size="sS" font="DM Sans" fontWeight="B" color="charcoal">
          {placeName}
        </Title>
        <CustomButton className={`fee ${noFeeProp?.value === 'N' ? 'fee-orange' : 'fee-green'}`} size="small">
          {`${noFeeProp?.value === 'N' ? `${t('atmLocations.Fee')}` : `${t('atmLocations.NoFee')}`}`}
          <Icon name="circleInfo" size="smaller" color={noFeeProp?.value === 'N' ? 'orange' : 'green'} onClick={showInfo} marginLeft={10} cursorPointer />
        </CustomButton>
      </CustomRow>

      {isInfoOpen && (
        <CustomCard className={`info ${noFeeProp?.value === 'N' ? 'orange' : 'green'}`}>
          <Icon name="circleClose" color="charcoal70" size="smaller" onClick={closeInfo} className="closeBtn" />
          {noFeeProp?.value === 'N' ? (
            <>
              <Title size="sS" font="DM Sans" fontWeight="B" color="orange">
                {t('atmLocations.Fee')}
              </Title>
              <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal" lineHeight="16px" marginTop={4}>
                {t('atmLocations.TenxNeverChargesFee')}
              </BodyText>
            </>
          ) : (
            <>
              <Title size="sS" font="DM Sans" fontWeight="B" color="green">
                {t('atmLocations.NoFee')}
              </Title>
              <BodyText textType="bodyText" size="T" fontWeight="R" color="charcoal" lineHeight="16px" marginTop={4}>
                {t('atmLocations.AtmIsPartOfMoneyPassOrVisa')}
              </BodyText>
            </>
          )}
        </CustomCard>
      )}

      <SWrapper className={isInfoOpen && !isDesktopSize ? 'hidden' : ''}>
        <CustomRow className="atm-inner" flexDirection="column" alignItems="flex-start" marginTop={16}>
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" lineHeight="20px">
            {getAddress()}
          </BodyText>
          <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal70" lineHeight="20px">
            {t('atmLocations.Distance')}: {score.toFixed(1)} {parseFloat(score.toFixed(1)) > 1 ? t('atmLocations.miles') : t('atmLocations.mile')}
          </BodyText>
        </CustomRow>

        <CustomRow className="atm-bottom" justifyContent="flex-end" marginTop={16}>
          <SLink className="direction" to={getUrl()} target={!isAndroid && !isIOS ? '_blank' : ''}>
            {t('atmLocations.Directions')}
          </SLink>
        </CustomRow>
      </SWrapper>
    </SCard>
  );
};
