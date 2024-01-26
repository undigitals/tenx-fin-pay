import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

interface ThemeControllerProps {
  theme: DefaultTheme;
  children: React.ReactNode;
}

export const ThemeController = ({ theme, children }: ThemeControllerProps) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
