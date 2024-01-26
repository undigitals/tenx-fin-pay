import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomVideoBlock } from 'components/theme/CustomVideoBlock/CustomVideoBlock';
import { useLazyGetVideosQuery } from 'store/video/video.api';
import { Loader } from 'components/general/Loader/Loader';
import { BaseSlider, SLIDER_SETTINGS } from 'components/general/Slider/Slider';
import { IVideoItem } from 'store/video/video.types';

export const WatchAndLearn = () => {
  const { t } = useTranslation();
  const [getVideosAPI, { isFetching, currentData }] = useLazyGetVideosQuery();
  const [forceStop, setForceStop] = useState(false);

  useEffect(() => {
    getVideosAPI('Main');
  }, []);

  if (isFetching) return <Loader />;

  return (
    <BaseSlider title={t('homeScreen.Watch & Learn')} settings={SLIDER_SETTINGS}>
      {currentData &&
        currentData.map((video: IVideoItem) => (
          <CustomVideoBlock videoSrc={video.location} title={video.name} playing={!forceStop} description="" colorScheme="purple" handlePlay={setForceStop} key={video.id} />
        ))}
    </BaseSlider>
  );
};
