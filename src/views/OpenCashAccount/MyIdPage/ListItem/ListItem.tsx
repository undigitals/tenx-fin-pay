import React from 'react';
import { BodyText } from 'components/general/Typography';
import { SChildrenContainer } from './ListItem.styles';

interface IListItem {
  title: string;
  imgSrc: string;
  children?: string | React.ReactNode;
  marginTop?: number;
}

export const ListItem: React.FC<IListItem> = ({ title, imgSrc, children, marginTop = '' }) => (
  <>
    <div className="listItem" style={{ marginBottom: '8px', marginTop: `${marginTop}px` }}>
      <img src={imgSrc} alt={title} />
      <BodyText textType="bodyText" color="charcoal" size="L" fontWeight="B" marginLeft={16}>
        {title}
      </BodyText>
    </div>
    <SChildrenContainer>{children}</SChildrenContainer>
  </>
);
