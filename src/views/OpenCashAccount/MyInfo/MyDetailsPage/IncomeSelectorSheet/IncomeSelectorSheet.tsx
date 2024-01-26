import { BodyText, Title } from 'components/general/Typography';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { INCOME_SOURCE_DATA } from 'views/OpenCashAccount/MyInfo/MyDetailsPage/mock/data';

interface IIncomeSelectorSheet {
  handleOnSelect: (option: any) => void;
  onClose: () => void;
  open: boolean;
  value?: string;
}

export const IncomeSelectorSheet: React.FC<IIncomeSelectorSheet> = ({ handleOnSelect, open, onClose, value }) => {
  const { t } = useTranslation();

  return (
    <CustomSheet isOpen={open} header={false} wrapperPadding={false} onClose={onClose}>
      <div className="my-details-status my-details-status-header">
        <Title font="Poppins" color="charcoal" fontWeight="SB" size="S" marginBottom="spacing-small">
          {t('accountOpening.Primary Income Source')}
        </Title>
        <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R">
          {t('accountOpening.Select your Primary Income Source')}
        </BodyText>
      </div>

      <div className="my-details-status my-details-status-items">
        {INCOME_SOURCE_DATA().map((item) => (
          <div className="my-details-status-items-inner" key={item.id} onClick={() => handleOnSelect(item)}>
            <BodyText textType="bodyText" fontWeight={value === item.label ? 'M' : 'R'} size="M" color={value === item.label ? 'blue' : 'charcoal'}>
              {item.label}
            </BodyText>
            {value === item.label && <Icon name="checked" size="smallest" color="blue" />}
          </div>
        ))}
      </div>
    </CustomSheet>
  );
};
