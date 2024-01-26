import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPolicies } from 'store/user/authentication.slice';
import { debounce } from 'views/Chat/utils/debounce';
import { Title } from 'components/general/Typography';
import { IntentsHeader } from 'views/Chat/components/IntentsHeader/IntentsHeader';
import { Icon } from 'components/general/Icon/Icon';
import { sunny } from 'assets';
import { SHeader, SHeaderLeft, SHeaderInnerWrapper, SHeaderTopLine, SLogoWrapper } from './CustomerHeader.styled';

export const CustomerHeader: FC = () => {
  const policies = useSelector(selectPolicies);
  const toolbarWrapperRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  let toolbarPosition = 0;

  const setMargin = () => {
    if (toolbarWrapperRef.current) {
      const newPosition = toolbarWrapperRef.current.getBoundingClientRect().top;
      if (newPosition < -1) {
        toolbarPosition = Math.abs(newPosition);
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          toolbarPosition -= 2;
        }
        if (toolbarRef.current) {
          toolbarRef.current.style.marginTop = `${toolbarPosition}px`;
        }
      }
    }
  };

  const debounceMargin = debounce(setMargin, 0);

  const showToolbar = () => {
    if (toolbarRef.current) {
      if (toolbarPosition > 0) {
        toolbarPosition = 0;
        toolbarRef.current.style.marginTop = `${0}px`;
      }
      debounceMargin();
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', showToolbar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SHeader ref={toolbarWrapperRef}>
      {!policies?.IntentsTestingEnabled && (
        <Title className="chatHeader" size="S" lineHeight="32px" fontWeight="B" color="black" textTag="h1" icon={<img src={sunny} alt="sunny" />}>
          Sunny
        </Title>
      )}
      {policies?.IntentsTestingEnabled && (
        <SHeaderInnerWrapper ref={toolbarRef}>
          <SHeaderTopLine />
          <SHeaderLeft>
            <SLogoWrapper>
              <Icon name="logo" />
            </SLogoWrapper>
          </SHeaderLeft>
          <IntentsHeader />
        </SHeaderInnerWrapper>
      )}
    </SHeader>
  );
};
