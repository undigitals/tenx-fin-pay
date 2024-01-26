import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { BodyText } from 'components/general/Typography';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { SPhoneNumberBlock } from './PhoneNumberBlock.styles';

interface IPhoneNumberBlockProps {
  phone?: string;
  handleContinue: () => void;
  isContinueDisabled?: boolean;
}

export const PhoneNumberBlock: React.FC<IPhoneNumberBlockProps> = ({ phone, handleContinue, isContinueDisabled }) => {
  const { t } = useTranslation();

  return (
    <SPhoneNumberBlock>
      <section className="phone-block">
        <div className="icon-wrapper">
          <Icon name="telephone" color="blue" size="normal" />
        </div>
        <BodyText textType="bodyText" color="charcoal70" fontWeight="R" size="L">
          {t('verification.Phone')}
        </BodyText>
        <BodyText textType="bodyText" color="charcoal" fontWeight="M" size="L">
          {phone}
        </BodyText>
      </section>
      <CustomButton preset="primary" onClick={handleContinue} disabled={isContinueDisabled}>
        {t('verification.Continue')}
      </CustomButton>
    </SPhoneNumberBlock>
  );
};
