import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ThemeController } from 'ThemeController';
import { render, RenderOptions } from '@testing-library/react';
import { theme } from 'styles/theme';

interface IRouterWrapper {
  children: React.ReactNode;
}

export const HistoryRouterWrapper =
  (history: MemoryHistory) =>
  ({ children }: IRouterWrapper) =>
    (
      <ThemeController theme={theme}>
        <Provider store={store}>
          <Router location={history.location} navigator={history}>
            {children}
          </Router>
        </Provider>
      </ThemeController>
    );

export const CustomRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: ({ children }: IRouterWrapper) => <ThemeController theme={theme}>{children}</ThemeController>, ...options });
