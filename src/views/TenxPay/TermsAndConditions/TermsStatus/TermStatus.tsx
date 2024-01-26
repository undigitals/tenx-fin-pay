import { Icon } from 'components/general/Icon/Icon';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomText } from 'components/theme/CustomText/CustomText';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ITermStatus {
  isAgreed: boolean;
  onClick: () => void;
}

export const TermStatus: React.FC<ITermStatus> = ({ isAgreed, onClick }) => {
  const { t } = useTranslation();

  return (
    <CustomCard onClick={onClick} cursorPointer>
      <CustomRow cursorPointer>
        <CustomRow cursorPointer>
          <Icon name={isAgreed ? 'circleTick' : 'circleMinus'} color={isAgreed ? 'green' : 'charcoal40'} cursorPointer />
          <CustomText textColor="charcoal" size="big" fontWeight="strongest" marginLeft={16} cursorPointer>
            {t('enrollTermsAndConditions.Terms And Conditions')}
          </CustomText>
        </CustomRow>
        <Icon name="chevronRight" size="smaller" color={isAgreed ? 'green' : 'purple'} cursorPointer />
      </CustomRow>
    </CustomCard>
  );
};
