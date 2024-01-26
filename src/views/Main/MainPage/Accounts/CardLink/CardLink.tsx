import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { CustomAmount } from 'components/theme/CustomAmount/CustomAmount';
import { BodyText } from 'components/general/Typography';
import { SStartIconWrapper, SBorderedBox } from './CardLink.styles';

interface ICardLink {
  onClick: () => void;
  title: string;
  amount?: number;
  startIcon: JSX.Element;
  className?: string;
}

export const CardLink: React.FC<ICardLink> = ({ title, amount, startIcon, className, onClick }) => (
  <SBorderedBox onClick={onClick} className={className}>
    <div className="title-container">
      <div className="top">
        <SStartIconWrapper>{startIcon}</SStartIconWrapper>
        <div className="arrow">
          <Icon onClick={onClick} name="arrowRight" color="blue" size="smaller" cursorPointer />
        </div>
      </div>
      <BodyText size="N" fontWeight="SB" color="charcoal" textType="bodyText" cursorPointer>
        {title}
      </BodyText>
    </div>

    <div className="actions-container">
      {amount !== undefined && <CustomAmount amount={amount} cursorPointer color={amount < 0 ? 'red' : 'charcoal'} size="smallerStrong" />}
      <Icon onClick={onClick} name="arrowRight" color="blue" size="smaller" cursorPointer className="bottom-arrow" />
    </div>
  </SBorderedBox>
);
