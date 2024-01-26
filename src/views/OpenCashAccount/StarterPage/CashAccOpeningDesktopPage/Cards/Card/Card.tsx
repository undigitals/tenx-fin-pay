import React, { useState } from 'react';
import clsx from 'clsx';
import { BodyText, Title } from 'components/general/Typography';
import { Icon } from 'components/general/Icon/Icon';
import { IconSign } from 'components/general/Icon/IconSign';
import { TIconName } from 'components/general/Icon/Icon.types';
import { SContainer } from './Card.styles';

type TCardProp = {
  title: string;
  name: string;
  list: React.ReactNode[];
  isCollapsible?: boolean;
  isCollapsedInitially?: boolean;
  bgIconName: TIconName;
};

export const Card: React.FC<TCardProp> = ({ title, name, bgIconName, list, isCollapsible = true, isCollapsedInitially = false }) => {
  const [isOpen, setOpen] = useState(!isCollapsedInitially);

  const onOpen = () => {
    if (isCollapsible) setOpen(!isOpen);
  };

  return (
    <SContainer className={clsx({ collapsed: !isOpen })}>
      <div className="title-container" onClick={onOpen}>
        <Title fontWeight="SB" size="T">
          {title}
        </Title>

        {isCollapsible && <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size="smallest" cursorPointer />}
      </div>

      <ul>
        {list.map((cardData: React.ReactNode, index: number) => (
          <BodyText textType="bodyText" fontWeight="R" size="T" color="charcoal70" lineHeight={1.4} marginBottom={8} id={`${name}=${index}`}>
            {cardData}
          </BodyText>
        ))}
      </ul>
      <IconSign iconName={bgIconName} bgColor="blue5" iconColor="blue" />
    </SContainer>
  );
};
