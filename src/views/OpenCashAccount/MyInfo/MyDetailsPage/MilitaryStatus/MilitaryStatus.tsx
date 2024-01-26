import React from 'react';
import { TMyDetailsProps, TRecord } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/MyDetailsPage.types';
import { useToggle } from 'utils/hooks/useToggle';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { MILITARY_STATUS_DATA } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/mock/data';
import { Icon } from 'components/general/Icon/Icon';
import { Chip } from 'components/general/Chip/Chip';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';

export const MilitaryStatus: React.FC<TMyDetailsProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const militaryStatusSheet = useToggle();

  const handleSelect = (option: TRecord) => {
    onChange(option);
    militaryStatusSheet.hide();
  };

  return (
    <>
      <CustomRequiredLabel label={t('accountOpening.Military Status')} fontFamily="DM Sans" marginBottom={10} marginTop={23} />

      <BaseInput placeholder={t('accountOpening.Select your Military Status')} onClick={militaryStatusSheet.show} value={value} suffix="chevronDown" suffixColor="charcoal" suffixSize="smaller" />

      {value !== t(`incomeSource.No Military Service`) && (
        <Chip preset="cream" size="small" extraStyles={{ color: 'charcoal', background: 'gold10' }} marginTop={5}>
          {t('accountOpening.ThankYouForService')}
        </Chip>
      )}

      <CustomSheet isOpen={militaryStatusSheet.isActive} header={false} wrapperPadding={false} onClose={militaryStatusSheet.hide}>
        <div className="my-details-status my-details-status-header">
          <Title font="Poppins" color="charcoal" fontWeight="SB" size="S" marginBottom="spacing-small">
            {t('accountOpening.Military Status')}
          </Title>
          <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
            {t('accountOpening.Select your Military Status')}
          </BodyText>
        </div>

        <div className="my-details-status my-details-status-items">
          {MILITARY_STATUS_DATA().map((item) => (
            <div className="my-details-status-items-inner" key={item.value} onClick={() => handleSelect(item)}>
              <BodyText textType="bodyText" fontWeight={value === item.label ? 'M' : 'R'} size="M" color={value === item.label ? 'blue' : 'charcoal'}>
                {item.label}
              </BodyText>
              {value === item.label && <Icon name="checked" size="smallest" color="blue" />}
            </div>
          ))}
        </div>
      </CustomSheet>
    </>
  );
};
