import React from 'react';
import { Title } from 'components/general/Typography';
import { SLayout } from './Header.styles';

interface IHeaderProps {
  headerTitle?: string;
  children: React.ReactNode;
  image?: string;
  isFullWidth?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ headerTitle, children, image, isFullWidth = false }) => (
  <SLayout isFullWidth={isFullWidth}>
    <header className="header">
      <section className="titleContainer">
        {headerTitle && (
          <Title fontWeight="M" size="L" font="Poppins" textAlign="start" color="charcoal" marginBottom={15}>
            {headerTitle}
          </Title>
        )}

        {children}
      </section>

      <div className="imageContainer">
        <img src={image} alt={headerTitle} width="158px" height="158px" />
      </div>
    </header>
  </SLayout>
);
