import React, { useState, useEffect } from 'react';
import { CustomVideoBlock } from 'components/theme/CustomVideoBlock/CustomVideoBlock';
import { useTranslation } from 'react-i18next';
import { useLazyGetVideosQuery } from 'store/video/video.api';
import { IVideoItem } from 'store/video/video.types';
import { SLIDER_SETTINGS } from 'components/general/Slider/Slider';
import { Loader } from 'components/general/Loader/Loader';
import { Title } from 'components/general/Typography';
import { SBaseSlider, SContainer } from './WonderingAbout.styles';

export const WonderingAbout: React.FC = () => {
  const { t } = useTranslation();
  const [getVideosAPI, { isFetching, currentData }] = useLazyGetVideosQuery();
  const [forceStop, setForceStop] = useState(false);

  useEffect(() => {
    getVideosAPI('LearnAndPlay');
  }, []);

  if (isFetching) return <Loader />;

  return (
    <SContainer>
      <Title fontWeight="SB" size="S" className="title-mobile">
        {t('learnPlay.WatchAndLearn')}
      </Title>
      <Title fontWeight="SB" size="S" className="title-web">
        {t('learnPlay.WonderingAbout')}
      </Title>
      <SBaseSlider title="" settings={SLIDER_SETTINGS}>
        {currentData &&
          currentData.map((video: IVideoItem) => (
            <div className="video-item" key={video.id}>
              <CustomVideoBlock videoSrc={video.location} title={video.name} playing={!forceStop} description="" colorScheme="blue" handlePlay={setForceStop} />
            </div>
          ))}
      </SBaseSlider>
    </SContainer>
  );
};
