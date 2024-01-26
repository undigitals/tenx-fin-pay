import { TThemeColor } from 'styles/theme';

export interface IVideoPlayerProps {
  src: string;
  colorScheme: TThemeColor;
  playing?: boolean;
  handlePlay?: Function;
  id?: string;
}

export interface IProgressData {
  played: number;
  playedSeconds: number;
}

export interface ISProgressBarProps {
  color: TThemeColor;
}

export interface ISControlsOverlayProps {
  isPlaying: boolean;
}
