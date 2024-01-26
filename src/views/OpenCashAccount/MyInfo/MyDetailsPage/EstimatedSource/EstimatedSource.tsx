import React, { useEffect } from 'react';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { TEstimatedSource, TEstimatedSourceProps } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/MyDetailsPage.types';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { selectDisplayAnnualIncomeSelectorSheet, setShowAnnualIncomeSelectorSheet } from 'store/ui.slice';
import { ESTIMATED_ANNUAL_INCOME } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/mock/data';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRequiredLabel } from 'components/theme/CustomRequiredLabel/CustomRequiredLabel';

export const EstimatedSource: React.FC<TEstimatedSourceProps> = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isOpen = useSelector(selectDisplayAnnualIncomeSelectorSheet);

  const handleOnClose = () => {
    dispatch(setShowAnnualIncomeSelectorSheet(false));
  };

  const handleInputClick = () => {
    dispatch(setShowAnnualIncomeSelectorSheet(true));
  };

  const handleOnSelect = (option: TEstimatedSource) => {
    dispatch(setShowAnnualIncomeSelectorSheet(false));
    onChange(option);
  };

  useEffect(() => {
    dispatch(setShowAnnualIncomeSelectorSheet(false));
  }, []);

  return (
    <>
      <CustomRequiredLabel label={t('accountOpening.Estimated Annual Income')} fontFamily="DM Sans" marginBottom={12} marginTop={30} />

      <BaseInput placeholder={t('accountOpening.Select Annual Household Income')} onClick={handleInputClick} value={value} suffix="chevronDown" suffixColor="charcoal" suffixSize="smaller" />

      <CustomSheet isOpen={isOpen} header={false} wrapperPadding={false} onClose={handleOnClose}>
        <div className="my-details-status my-details-status-header">
          <Title font="Poppins" color="charcoal" fontWeight="SB" size="S" marginBottom="spacing-small">
            {t('accountOpening.Estimated Annual Income')}
          </Title>
          <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
            {t('accountOpening.Select your Annual Income')}
          </BodyText>
        </div>

        <div className="my-details-status my-details-status-items">
          {ESTIMATED_ANNUAL_INCOME().map((item) => (
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
