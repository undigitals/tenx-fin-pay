import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { VideoPlayer } from 'components/general/VideoPlayer/VideoPlayer';
import { BodyText } from 'components/general/Typography';
import { SBottomContainer, SContainer, SVideoWrapper } from './CustomVideoBlock.styles';
import { ICustomVideoBlockProps } from './CustomCard.types';

export const CustomVideoBlock = ({ title, videoSrc, description, colorScheme, playing, handlePlay }: ICustomVideoBlockProps) => {
  return (
    <SContainer marginBottom={25}>
      <SVideoWrapper>
        <VideoPlayer src={videoSrc} colorScheme={colorScheme} playing={playing} handlePlay={handlePlay} />
      </SVideoWrapper>
      <SBottomContainer>
        <CustomRow justifyContent="flex-start" marginBottom={15} marginTop={30}>
          <Icon name="videoArrowTop" color={colorScheme} size="smaller" />
          <BodyText textType="bodyText" font="Poppins" size="M" color="charcoal" fontWeight="SB" marginLeft={5}>
            {title}
          </BodyText>
        </CustomRow>
        <BodyText textType="bodyText" size="N" color="charcoal" fontWeight="R">
          {description}
        </BodyText>
      </SBottomContainer>
    </SContainer>
  );
};
