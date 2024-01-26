import React, { ReactElement } from 'react';
import { Title, BodyText } from 'components/general/Typography';
import { images } from 'assets';
import { SImageBorder, SArrowRight, SLayout, SCustomRow, SCustomButton, SAdditionalButton } from './ResultsPage.styles';

interface IResultsPageProps {
  icon?: ReactElement;
  title: ReactElement | string;
  children: React.ReactNode;
  btnTitle: string;
  onClick: () => void;
  showBtnIcon?: boolean;
  image?: string | '';
  additionalBtnTitle?: string;
  additionalOnClick?: () => void;
}

export const ResultsPage: React.FC<IResultsPageProps> = ({ icon, title, children, btnTitle, onClick, showBtnIcon = false, image, additionalBtnTitle, additionalOnClick }) => (
  <SLayout>
    <SImageBorder>
      {icon && (
        <SCustomRow marginBottom={38} alignItems="center" justifyContent="center" width="100%">
          {icon}
        </SCustomRow>
      )}

      {image && <img src={images[image as keyof typeof images]} alt={image} />}

      <Title textAlign="center" justifyContent="center" size="M" fontWeight="M" marginBottom={16}>
        {title}
      </Title>
      <BodyText textType="bodyText" fontWeight="R" size="N" color="charcoal70" lineHeight={1.6} textAlign="center" justifyContent="center">
        {children}
      </BodyText>
    </SImageBorder>

    {btnTitle && (
      <SCustomButton preset="primary" onClick={onClick} marginTop={48}>
        {btnTitle} {showBtnIcon && <SArrowRight />}
      </SCustomButton>
    )}

    {additionalBtnTitle && (
      <SAdditionalButton onClick={additionalOnClick} marginTop={20} marginBottom={40}>
        {additionalBtnTitle}
      </SAdditionalButton>
    )}
  </SLayout>
);
