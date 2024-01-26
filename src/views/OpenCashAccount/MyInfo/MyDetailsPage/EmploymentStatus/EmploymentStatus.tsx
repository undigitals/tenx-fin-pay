import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TMyDetailsProps, TRecord } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/MyDetailsPage.types';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { selectDisplayEmploymentStatusSelectorSheet, setShowEmploymentStatusSelectorSheet } from 'store/ui.slice';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { EMPLOYMENT_STATUS_DATA } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/mock/data';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';

export const EmploymentStatus: React.FC<TMyDetailsProps> = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isOpen = useSelector(selectDisplayEmploymentStatusSelectorSheet);

  const handleOnClose = () => {
    dispatch(setShowEmploymentStatusSelectorSheet(false));
  };

  const handleInputClick = () => {
    dispatch(setShowEmploymentStatusSelectorSheet(true));
  };

  const handleOnSelect = (option: TRecord) => {
    dispatch(setShowEmploymentStatusSelectorSheet(false));
    onChange(option);
  };

  useEffect(() => {
    dispatch(setShowEmploymentStatusSelectorSheet(false));
  }, []);

  return (
    <>
      <CustomRequiredLabel label={t('accountOpening.Employment Status')} fontFamily="DM Sans" marginBottom={10} />

      <BaseInput placeholder={t('accountOpening.Select Employment Status')} onClick={handleInputClick} value={value} suffix="chevronDown" suffixColor="charcoal" suffixSize="smaller" />

      <CustomSheet isOpen={isOpen} header={false} wrapperPadding={false} onClose={handleOnClose}>
        <div className="my-details-status my-details-status-header">
          <Title font="Poppins" color="charcoal" fontWeight="SB" size="S" marginBottom="spacing-small">
            {t('accountOpening.Employment Status')}
          </Title>
          <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
            {t('accountOpening.Select your Employment Status')}
          </BodyText>
        </div>

        <div className="my-details-status my-details-status-items">
          {EMPLOYMENT_STATUS_DATA().map((item) => (
            <div className="my-details-status-items-inner" key={item.id} onClick={() => handleOnSelect(item)}>
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
