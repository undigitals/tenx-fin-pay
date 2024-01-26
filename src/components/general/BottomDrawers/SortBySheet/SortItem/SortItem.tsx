import React from 'react';
import { useTheme } from 'styled-components';
import { RadioButton } from 'components/general/RadioButton/RadioButton';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';

interface ISortItem {
  title: string;
  id: string;
  onChange: (id: string, title: string) => void;
  selected: boolean;
}

export const SortItem: React.FC<ISortItem> = ({ title, id, onChange, selected }) => {
  const handleRadioChange = () => {
    onChange(id, title);
  };
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CustomCard border={`2px solid ${selected ? theme.blue : theme.charcoal5}`} width="100%">
      <CustomRow>
        <RadioButton onChange={handleRadioChange} checked={selected}>
          <BodyText textType="bodyText" font="DM Sans" color="charcoal" size="N" fontWeight={selected ? 'B' : 'R'} cursorPointer>
            {t(title)}
          </BodyText>
        </RadioButton>
      </CustomRow>
    </CustomCard>
  );
};
