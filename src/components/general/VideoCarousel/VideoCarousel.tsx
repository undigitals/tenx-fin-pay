import React, { ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CarouselRef } from 'antd/lib/carousel';
import { Icon } from 'components/general/Icon/Icon';
import { ArrowsButton, ArrowsStyledBlocks, SCarousel, SCollapseButton, SSubTitle, STitleWrapper } from 'components/general/VideoCarousel/VideoCarousel.styles';
import { SCardTitle } from 'views/MenuPage/MainPage.styles';
import { BodyText } from 'components/general/Typography';
import { useSetUIPreferenceMutation } from 'store/user/properties/userProperties.api';
import { Loader } from 'components/general/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectCurrentAuthState } from 'store/user/authentication.slice';

interface IVideoCarouselProps {
  children: ReactNode[];
  onChange?: Function;
  isArrow?: boolean;
  title?: string;
  isSubTitle?: boolean;
  subTitle?: string;
  handleTitleClick?: () => void;
  collapseChange?: (collapsed: boolean | null) => void;
  displayCollapseBtn?: boolean;
}

export const VideoCarousel = ({ children, onChange, isArrow = false, handleTitleClick, title, isSubTitle, subTitle, displayCollapseBtn, collapseChange }: IVideoCarouselProps) => {
  const sliderSettings = {
    dots: true,
    slidesToShow: 1.04,
    slidesToScroll: 1,
    afterChange: () => {
      if (onChange) onChange(true);
    },
  };
  const slider = useRef<CarouselRef>(null);
  const [setUIPreference, setUIPreferenceResult] = useSetUIPreferenceMutation();
  const { UIPreferences } = useSelector(selectCurrentAuthState);
  const { t } = useTranslation();

  const handleCollapseChange = () => {
    const data = {
      value: {
        isMyAccountCollapsed: !UIPreferences?.isMyAccountCollapsed,
        isTenxPayCollapsed: UIPreferences?.isTenxPayCollapsed,
      },
    };

    setUIPreference(data);
    collapseChange?.(!UIPreferences?.isMyAccountCollapsed);
  };

  if (setUIPreferenceResult?.isLoading) return <Loader />;

  return (
    <>
      <STitleWrapper>
        <SCardTitle size="big" marginBottom="smaller" paddingTop={4} onClick={handleTitleClick}>
          {title}
        </SCardTitle>

        {isArrow && (
          <ArrowsStyledBlocks>
            <ArrowsButton type="button" onClick={() => slider.current && slider.current.prev()}>
              <Icon name="arrowLeft" color="blue" size="smaller" cursorPointer />
            </ArrowsButton>
            <ArrowsButton type="button" onClick={() => slider.current && slider.current!.next()}>
              <Icon name="arrowRight" color="blue" size="smaller" cursorPointer />
            </ArrowsButton>
          </ArrowsStyledBlocks>
        )}

        {displayCollapseBtn && (
          <SCollapseButton onClick={handleCollapseChange}>
            <BodyText textType="bodyText" color="blue" size="T" fontWeight="B" cursorPointer>
              {UIPreferences?.isMyAccountCollapsed ? t('homeScreen.Show more') : t('homeScreen.Show less')}
            </BodyText>
          </SCollapseButton>
        )}

        {isSubTitle && (
          <SSubTitle>
            <BodyText size="T" color="charcoal70" marginBottom={18} fontWeight="R" textType="bodyText">
              {subTitle}
            </BodyText>
          </SSubTitle>
        )}
      </STitleWrapper>
      <SCarousel ref={slider} {...sliderSettings}>
        {children}
      </SCarousel>
    </>
  );
};
