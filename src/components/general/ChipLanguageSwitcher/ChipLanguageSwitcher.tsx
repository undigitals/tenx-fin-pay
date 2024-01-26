import React, { useEffect, useState } from 'react';
import { useLanguage } from 'utils/hooks/useLanguage';
import { SChip, SLayout } from './ChipLanguageSwitcher.styles';
import { TChipLanguageProps } from './ChipLanguageSwitcher.types';

export const ChipLanguageSwitcher: React.FC<TChipLanguageProps> = ({ defaultValue, preset = 'default', isDisabled }) => {
  const { language, changeLanguage } = useLanguage();
  const [lang, setLang] = useState(language.split('-')[0] || defaultValue || '');

  const chipHandler = (value: string) => {
    changeLanguage(value)
      .then(() => setLang(value))
      .catch(() => setLang(''));
  };

  useEffect(() => {
    const getUserLang = language.split('-')[0];
    setLang(getUserLang === 'es' ? getUserLang : 'en');
  }, [language]);

  return (
    <SLayout>
      <SChip preset={preset} value="en" onChipClick={chipHandler} marginRight={13} isActive={lang === 'en'}>
        English
      </SChip>
      <SChip preset={isDisabled ? 'disabled' : preset} value="es" onChipClick={chipHandler} isActive={lang === 'es'} isDisabled={isDisabled}>
        Español
      </SChip>
    </SLayout>
  );
};
