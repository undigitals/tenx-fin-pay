import React from 'react';
import { render, screen } from 'test-utils';
import { fireEvent, waitFor } from '@testing-library/react';
import { DIGITAL_BANKING_VIDEO_URL } from 'vars/const/externalUrls';
import i18next from 'i18next';
import { VideoPlayer } from './VideoPlayer';
import { FullscreenBtn, PlayPauseBtn } from './VideoPlayer.styles';

describe('Video Player component', () => {
  test('Render Video Player with video items', async () => {
    const videoProperties = {
      src: DIGITAL_BANKING_VIDEO_URL,
      title: 'About our Stuff and Save Envelopes1',
      // eslint-disable-next-line
      description: 'Tenx\'s Stuff and Save Envelopes can help you budget " +\n' + "'for short-term needs and save for long-term goals! Available in 2023.",
      buttonText: i18next.t('goalsTools.Sign up for our waitlist'),
      buttonLink: '',
    };

    render(<VideoPlayer src={videoProperties.src} colorScheme="blue" />);

    const videoPlayer = screen.getByTestId('videoPlayer');

    await waitFor(() => expect(videoPlayer).toBeVisible());
  });

  test('Test colorScheme and color properties', async () => {
    await waitFor(() => render(<FullscreenBtn color="blue" name="fullscreen" />));
    const fullScreenButton = screen.getByTestId('icon-fullscreen');

    await waitFor(() => render(<PlayPauseBtn color="blue" name="play" />));
    const playPauseButton = screen.getByTestId('icon-play');

    await waitFor(() => expect(fullScreenButton).toHaveAttribute('color'));
    await waitFor(() => expect(playPauseButton).toHaveAttribute('color'));
  });

  test('Test play event', async () => {
    const handlePlayPause = jest.fn();

    await waitFor(() => render(<PlayPauseBtn color="blue" onClick={handlePlayPause} name="play" />));
    const playButton = screen.getByTestId('icon-play');

    fireEvent.click(playButton);
    await waitFor(() => expect(handlePlayPause).toHaveBeenCalledTimes(1));
  });

  test('Test pause event', async () => {
    const handlePlayPause = jest.fn();

    await waitFor(() => render(<PlayPauseBtn color="blue" onClick={handlePlayPause} name="pause" />));
    const pauseButton = screen.getByTestId('icon-pause');

    fireEvent.click(pauseButton);
    await waitFor(() => expect(handlePlayPause).toHaveBeenCalledTimes(1));
  });

  test('Test full screen event', async () => {
    const handleFullScreen = jest.fn();

    await waitFor(() => render(<FullscreenBtn color="blue" name="fullscreen" onClick={handleFullScreen} />));
    const fullScreenButton = screen.getByTestId('icon-fullscreen');

    fireEvent.click(fullScreenButton);
    await waitFor(() => expect(handleFullScreen).toHaveBeenCalledTimes(1));
  });
});
