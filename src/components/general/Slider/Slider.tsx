import React, { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { BodyText, Title } from 'components/general/Typography';
import { useSetUIPreferenceMutation } from 'store/user/properties/userProperties.api';
import { store } from 'store/store';
import { useTranslation } from 'react-i18next';
import { Loader } from 'components/general/Loader/Loader';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { SCollapseButton, SContainer, SSlider } from './Slider.styles';

export const SLIDER_SETTINGS: Settings = {
  dots: true,
  infinite: false,
  speed: 350,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  accessibility: true,
};

interface ISlider {
  children: React.ReactNode;
  settings: Settings;
  title: string;
  subtitle?: string;
  isSubtitle?: boolean;
  displayCollapseBtn?: boolean;
  handleTitleClick?: () => void;
  collapseChange?: (collapsed: boolean | null) => void;
}

export const BaseSlider: React.FC<ISlider> = ({ settings, children, title, isSubtitle, handleTitleClick, collapseChange, subtitle, displayCollapseBtn }) => {
  const [setUIPreference, setUIPreferenceResult] = useSetUIPreferenceMutation();
  const { UIPreferences } = store.getState().authentication;
  const { t } = useTranslation();
  const sliderRef = useRef<Slider>(null);

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

  if (setUIPreferenceResult.isLoading) return <Loader />;

  return (
    <SContainer>
      <CustomRow marginBottom={20} flexDirection="column">
        <CustomRow alignItems="flex-end" justifyContent="space-between" width="100%">
          <Title fontWeight="SB" size="S" onClick={handleTitleClick}>
            {title}
          </Title>
          <CustomRow flexDirection="column">
            {displayCollapseBtn && (
              <SCollapseButton onClick={handleCollapseChange}>
                <BodyText textType="bodyText" color="blue" size="T" fontWeight="B" cursorPointer>
                  {UIPreferences?.isMyAccountCollapsed ? t('homeScreen.Show more') : t('homeScreen.Show less')}
                </BodyText>
              </SCollapseButton>
            )}
          </CustomRow>
        </CustomRow>
        {isSubtitle && (
          <CustomRow marginTop={15}>
            <BodyText size="N" color="charcoal70" fontWeight="R" textType="bodyText">
              {subtitle}
            </BodyText>
          </CustomRow>
        )}
      </CustomRow>
      <SSlider ref={sliderRef} {...settings}>
        {children}
      </SSlider>
    </SContainer>
  );
};
