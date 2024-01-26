import React, { useState, useRef, MouseEvent, KeyboardEvent, useEffect } from 'react';
import { Loader } from 'components/general/Loader/Loader';
import { useAnalytics } from 'utils/hooks/useAnalytics';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player';
import { IVideoPlayerProps, IProgressData } from './VideoPlayer.types';
import { SContainer, PlayPauseBtn, SControlsOverlay, FullscreenBtn, ProgressBar, SProgressbarWrapper, STime, SPlaceholder } from './VideoPlayer.styles';

const formatTimeFromSec = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const hStr = h ? `${h}:` : '';
  const m = Math.floor((sec - h * 3600) / 60);
  const mStr = h && m < 10 ? `0${m}:` : `${m}:`;
  const s = Math.floor(sec - h * 3600 - m * 60);
  const sStr = s < 10 ? `0${s}` : s;

  return `${hStr}${mStr}${sStr}`;
};

export const VideoPlayer: React.FC<IVideoPlayerProps> = ({ src, colorScheme, playing, handlePlay }) => {
  const { track } = useAnalytics();
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [played, setPlayed] = useState(0);
  const [remainedTime, setRemainedTime] = useState(0);
  const playerContainerRef = useRef(null);
  const playerRef = useRef<ReactPlayer>(null);
  const duration = playerRef.current?.getDuration();

  const handleOffset = played > 0.5 ? '-10px' : 0;

  const seek = (value: number) => {
    setPlayed(value);
    playerRef.current?.seekTo(value);
  };

  const handleReady = () => {
    if (!isReady) {
      seek(played + 0.001);
    }
    setIsReady(true);
  };

  const updateRemainedTime = (playedSeconds: number) => {
    if (duration) {
      setRemainedTime(duration - playedSeconds);
    }
  };

  const handleTrackEvent = () => {
    if (!isPlaying) {
      track('start_watching', src);
    } else {
      track('stop_watching', src);
    }
  };

  const handlePlayPause = (event: MouseEvent) => {
    event.stopPropagation();
    setIsPlaying(!isPlaying);
    handleTrackEvent();
  };

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleFullscreen = (event: MouseEvent) => {
    event.stopPropagation();
    if (playerContainerRef.current && screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current);
      setIsFullscreen(!screenfull.isFullscreen);
    }
  };

  const handleProgress = (data: IProgressData) => {
    updateRemainedTime(data.playedSeconds);
    if (!isSeeking) {
      setPlayed(data.played);
    }
  };

  const handleManualProgressChange = (value: number) => {
    seek(value);
    setIsSeeking(true);
  };

  const handleAfterManualProgressChange = () => {
    setIsSeeking(false);
  };

  const handlePropgressAreaClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta = 0.009;
    if (event.key === 'ArrowRight') {
      seek(played + delta);
    }
    if (event.key === 'ArrowLeft') {
      seek(played - delta);
    }
  };

  useEffect(() => {
    if (isPlaying && handlePlay) {
      handlePlay(false);
    }
  }, [handlePlay, isPlaying]);

  useEffect(() => {
    if (!playing) {
      setIsPlaying(false);
    }
  }, [playing]);

  return (
    <SContainer ref={playerContainerRef} tabIndex={-1} onKeyDown={handleKeyPress} data-testid="videoPlayer">
      <ReactPlayer
        url={src}
        playing={isPlaying}
        controls={false}
        ref={playerRef}
        width="100%"
        height={isReady ? '100%' : '200px'}
        progressInterval={500}
        onProgress={handleProgress}
        onReady={handleReady}
        config={{
          file: {
            attributes: {
              poster: '',
              preload: 'metadata',
            },
          },
        }}
      />
      {!isReady && (
        <SPlaceholder>
          <Loader />
        </SPlaceholder>
      )}
      {isReady && (
        <SControlsOverlay onClick={handleVideoClick} isPlaying={isPlaying}>
          <SProgressbarWrapper onClick={handlePropgressAreaClick}>
            <ProgressBar
              value={played}
              defaultValue={played}
              step={0.0001}
              min={0}
              max={1}
              onChange={handleManualProgressChange}
              onAfterChange={handleAfterManualProgressChange}
              color={colorScheme}
              tooltipVisible={false}
              handleStyle={{ transform: `translateX(${handleOffset})` }}
            />
          </SProgressbarWrapper>
          <FullscreenBtn name={isFullscreen ? 'exitFullscreen' : 'fullscreen'} color={colorScheme} size="big" onClick={handleToggleFullscreen} cursorPointer />
          <PlayPauseBtn name={isPlaying ? 'pause' : 'play'} color={colorScheme} size="big" onClick={handlePlayPause} cursorPointer />
          <STime textColor={colorScheme} fontWeight="strong">
            {formatTimeFromSec(remainedTime)}
          </STime>
        </SControlsOverlay>
      )}
    </SContainer>
  );
};
