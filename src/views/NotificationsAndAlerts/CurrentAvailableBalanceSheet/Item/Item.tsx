import React from 'react';
import { useTheme } from 'styled-components';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';

interface IItem {
  label: string;
  value: string;
  onChange: (id: string, title: string) => void;
  selected: boolean;
}

export const Item: React.FC<IItem> = ({ label, value, onChange, selected }) => {
  const handleRadioChange = () => {
    onChange(value, label);
  };
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CustomCard border={`2px solid ${selected ? theme.blue : theme.charcoal5}`} width="100%">
      <RadioButton onChange={handleRadioChange} checked={selected}>
        <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight={selected ? 'B' : 'R'} cursorPointer>
          {t(label)}
        </BodyText>
      </RadioButton>
    </CustomCard>
  );
};
