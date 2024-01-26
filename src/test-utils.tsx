import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { i18n } from './i18n/i18n';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});

const persistor = persistStore(store);

export function render(ui: any, { ...renderOptions } = {}) {
  function Wrapper({ children }: any) {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <ConfigProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <PersistGate loading={null} persistor={persistor}>
                  {children}
                </PersistGate>
              </ThemeProvider>
            </ConfigProvider>
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
