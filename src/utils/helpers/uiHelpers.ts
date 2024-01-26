import { isAndroid, isIOS } from 'react-device-detect';

const config = {
  iOS: {
    headerHeight: 51,
  },
  android: {
    headerHeight: 43,
  },
  default: {
    headerHeight: 96,
  },
};

interface IDeviceHeaderSizes {
  headerHeight: number;
}

export const getDeviceHeaderSizes = (): IDeviceHeaderSizes => {
  if (isIOS) return config.iOS;
  if (isAndroid) return config.android;

  return config.default;
};
