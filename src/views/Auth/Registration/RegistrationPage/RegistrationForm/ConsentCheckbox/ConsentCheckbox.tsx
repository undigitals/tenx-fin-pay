import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText } from 'components/general/Typography';
import { SInputGroupRegForm } from './ConsentCheckbox.styles';

interface IConsentCheckboxProps {
  handleChangeCheckbox: () => void;
  isChecked?: boolean;
  handleOpen: () => void;
  disclosureName?: string;
}

export const ConsentCheckbox: React.FC<IConsentCheckboxProps> = ({ handleChangeCheckbox, isChecked, handleOpen, disclosureName }) => {
  const { t } = useTranslation();

  return (
    <div className="consent-checkbox">
      <SInputGroupRegForm>
        <Checkbox checked={isChecked} onChange={handleChangeCheckbox} bgColor="white">
          <div className="consent-checkbox-disclosure-text">
            <BodyText textType="bodyText" color="charcoal70" size="N" fontWeight="R" marginRight={5}>
              {t('registration.AgreePreText')}
            </BodyText>
            <BodyText textType="bodyText" color="blue" size="N" fontWeight="R" onClick={handleOpen} cursorPointer underlined>
              {' '}
              {disclosureName}
            </BodyText>
          </div>
        </Checkbox>
      </SInputGroupRegForm>
    </div>
  );
};
