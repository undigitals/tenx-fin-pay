// Get User Agent. Return a string that includes unparsed user agent.
const getUserAgent = () => navigator.userAgent;

// Get Plugins. Return a string that includes a list of installed plugins.
const getPlugins = () =>
  Array.from(navigator.plugins).reduce((acc, currentValue, i, arr) => {
    if (i === arr.length - 1) {
      return `${acc}${arr[i].name}`;
    }
    return `${acc}${arr[i].name}, `;
  }, '');

// Get Time Zone. Return a string includes the time zone.
const getTimeZone = () => {
  const rightNow = new Date();
  let myNumber;
  let formattedNumber;
  let result;

  myNumber = rightNow.getTimezoneOffset() / 60;
  if (myNumber < 0) {
    myNumber *= -1;
    formattedNumber = `0${myNumber}`.slice(-2);
    result = `-${formattedNumber}`;
  } else {
    formattedNumber = `0${myNumber}`.slice(-2);
    result = `+${formattedNumber}`;
  }
  return result;
};

// Get Language. Return a string includes the user language.
const getLanguage = () => navigator.language;

// Get System Language. Return a string includes the system language.
const getSystemLanguage = () => navigator.systemLanguage || window.navigator.language;

// Get Available Resolution.  Return a string includes the available resolution.
const getAvailableResolution = () => `${window.screen.availWidth}x${window.screen.availHeight}`;

// Get Device XPDI.  Return a string  includes the device XPDI.
const getDeviceXDPI = () => window.screen.availWidth / window.screen.pixelDepth;

// Get Device YDPI.  Return a string includes the device YDPI.
const getDeviceYDPI = () => window.screen.availHeight / window.screen.pixelDepth;

export const getFingerpint = <T extends boolean>(shouldSerialize?: T): T extends true ? string : any => {
  const fp = {
    userAgent: getUserAgent(),
    pluginList: getPlugins(),
    timeZone: getTimeZone(),
    language: getLanguage(),
    systemLanguage: getSystemLanguage(),
    availableResolution: getAvailableResolution(),
    deviceXDPI: getDeviceXDPI(),
    deviceYDPI: getDeviceYDPI(),
  } as any;

  return shouldSerialize ? JSON.stringify(fp) : fp;
};

export const webID = () => getFingerpint();
