import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyText, Title } from 'components/general/Typography';
import { themeBlue } from 'styles/theme';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { SLayout, SWrapper } from './Breadcrumbs.styles';
import { TBreadcrumbsProps } from './Breadcrumbs.types';

export const Breadcrumbs: React.FC<TBreadcrumbsProps> = ({ paths, title, hasBackNav = false }) => {
  const navigate = useNavigate();
  if (!paths.length) return null;

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute('aria-current')) {
      event.preventDefault();
    }
  };

  const handleBackClick = () => navigate(-1);

  return (
    <SWrapper hasMarginLeft={!!title}>
      {(title || hasBackNav) && (
        <CustomRow justifyContent="flex-start" marginBottom={8}>
          {hasBackNav && <Icon name="arrowLeft" color="blue" onClick={handleBackClick} cursorPointer />}
          {title && (
            <Title size="sM" fontWeight="B" font="DM Sans" marginLeft={hasBackNav ? 12 : 0}>
              {title}
            </Title>
          )}
        </CustomRow>
      )}
      <SLayout noPadding={!!title}>
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
    </SWrapper>
  );
};
