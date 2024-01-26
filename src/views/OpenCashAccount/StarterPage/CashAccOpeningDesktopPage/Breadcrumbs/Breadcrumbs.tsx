import React, { MouseEventHandler } from 'react';
import { BodyText } from 'components/general/Typography';
import { themeBlue } from 'styles/theme';
import { TBreadcrumbsPath } from 'views/OpenCashAccount/StarterPage/CashAccOpeningDesktopPage/CashAccOpeningDesktopPage';
import { Icon } from 'components/general/Icon/Icon';
import { SLayout } from './Breadcrumbs.styles';

type TBreadcrumbsProps = {
  paths: TBreadcrumbsPath[];
};

export const Breadcrumbs = ({ paths }: TBreadcrumbsProps) => {
  if (!paths.length) return null;

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute('aria-current')) {
      event.preventDefault();
    }
  };

  return (
    <SLayout>
      {paths.map(({ id, name, path }, index, arr) => {
        const lastItem = arr.length === index + 1;

        return (
          <li>
            <BodyText
              textType="bodyText"
              textTag="span"
              fontWeight={lastItem ? 'M' : 'R'}
              size="T"
              color={lastItem ? 'blue' : 'charcoal70'}
              key={id}
              extraStyles={!path ? { background: themeBlue.blue10, padding: 4, borderRadius: 4 } : {}}
            >
              <a href={path} onClick={handleLinkClick} aria-current={!path ? 'page' : false}>
                {name}
              </a>
            </BodyText>
            {!lastItem && <Icon name="chevronRight" size="smallest" color="charcoal40" marginLeft={14} marginRight={14} />}
          </li>
        );
      })}
    </SLayout>
  );
};
