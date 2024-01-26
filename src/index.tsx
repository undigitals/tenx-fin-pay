import React from 'react';
import 'antd/dist/antd.min.css';
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Fonts } from 'styles/fonts';
import { i18n } from './i18n/i18n';
import { store, persistor } from './store/store';
import { GlobalStyle } from './styles/GlobalStyle';
import { webID } from './utils/helpers/webID';
import { ThemeController } from './ThemeController';
import { mobileInjectionInit } from './services/mobileService';
import { App } from './App';
import { theme } from './styles/theme';

mobileInjectionInit();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ConfigProvider>
            <ThemeController theme={theme}>
              <Fonts />
              <GlobalStyle />
              <App />
            </ThemeController>
          </ConfigProvider>
        </BrowserRouter>
      </I18nextProvider>
    </PersistGate>
  </Provider>
);

webID();
