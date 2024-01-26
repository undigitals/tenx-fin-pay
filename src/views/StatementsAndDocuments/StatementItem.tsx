import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Title } from 'components/general/Typography';

export interface IStatementItem {
  title: string;
  handleOpenIframe: (isOpen: boolean, title: string) => void;
  arrowIcon?: string | null;
  index: number;
}

export const StatementItem: React.FC<IStatementItem> = ({ title, handleOpenIframe, arrowIcon = 'chevronRight', index }) => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    handleOpenIframe(true, title);
  };

  return (
    <CustomRow onClick={handleOnClick} cursorPointer marginTop={index > 0 ? 24 : 0}>
      <CustomRow justifyContent="flex-start">
        <Title size="sS" font="DM Sans" fontWeight="B" color="charcoal">
          {t(`statementsDocuments.${title}`)}
        </Title>
      </CustomRow>
      {arrowIcon && <Icon name={arrowIcon} color="blue" size="smallest" cursorPointer />}
    </CustomRow>
  );
};
