import React, { ReactElement } from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { BodyText } from 'components/general/Typography';

interface IVerificationCard {
  icon: ReactElement;
  children: string | ReactElement;
  onClick: () => void;
  last?: boolean;
}

export const VerificationCard: React.FC<IVerificationCard> = ({ icon, onClick, last = false, children }) => (
  <CustomCard onClick={onClick} marginBottom={last ? 30 : 0} marginTop={16} cursorPointer>
    <div className="verificationCard">
      <div className="verificationCardInner">
        {icon}
        <BodyText textType="bodyText" color="charcoal" size="M" fontWeight="B" marginLeft={16}>
          {children}
        </BodyText>
      </div>
      <div>
        <Icon name="chevronRight" color="bluePurple" size="smaller" cursorPointer />
      </div>
    </div>
  </CustomCard>
);
