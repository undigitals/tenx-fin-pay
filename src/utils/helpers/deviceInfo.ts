import { osVersion, osName, mobileVendor, mobileModel, isMobileOnly, isAndroid, isIOS } from 'react-device-detect';

const deviceTypes = {
  iPhone: 'IPhone',
  iPad: 'IPad',
  Android: 'Android',
  Browser: 'Browser',
};

interface IDeviceInfo {
  type: string;
  name: string;
  manufacture: string;
  os: string;
  version: string;
  userAgent: string;
}

export const getUserAgent = () => navigator.userAgent;
export const getDeviceVersion = () => `${osName} ${osVersion}`;
export const getDeviceOs = () => osName;
export const getDeviceManufacture = () => mobileVendor;
export const getDeviceName = () => mobileModel;
export const getDeviceType = () => {
  if (isIOS) return isMobileOnly ? deviceTypes.iPhone : deviceTypes.iPad;
  if (isAndroid) return deviceTypes.Android;
  return deviceTypes.Browser;
};

export const getDeviceInfo = (): IDeviceInfo => ({
  type: getDeviceType(),
  name: getDeviceName(),
  manufacture: getDeviceManufacture(),
  os: getDeviceOs(),
  version: getDeviceVersion(),
  userAgent: getUserAgent(),
});
