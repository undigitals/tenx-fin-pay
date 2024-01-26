import { IUrlString } from 'utils/helpers/urlString/urlString.types';

export interface IFrameControllableProps extends IUrlString {
  id?: string;
  onLoad?: () => void;
}

export interface IFrameProps {
  url: string;
  params?: string;
}
