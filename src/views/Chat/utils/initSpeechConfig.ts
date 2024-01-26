import * as speechSDK from 'microsoft-cognitiveservices-speech-sdk';

export const initSpeechConfig = (SPEECH_AUTH_TOKEN: string, SPEECH_REGION: string) => {
  const speechConfig = speechSDK.SpeechConfig.fromSubscription(SPEECH_AUTH_TOKEN, SPEECH_REGION);

  speechConfig.speechRecognitionLanguage = 'en-US';
  speechConfig.setProperty(speechSDK.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, '1000');
  speechConfig.setProperty(speechSDK.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, '1500');

  const audioConfig = speechSDK.AudioConfig.fromDefaultMicrophoneInput();

  return new speechSDK.SpeechRecognizer(speechConfig, audioConfig);
};
