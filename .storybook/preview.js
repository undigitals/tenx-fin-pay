import { withThemeProvider } from 'storybook-addon-theme-provider';
import { ThemeController } from '../src/ThemeController';
import { theme } from '../src/styles/theme';
import { BrowserRouter } from 'react-router-dom';

const withRouter = (story) => (
  <>
    <BrowserRouter>{story()}</BrowserRouter>
  </>
);

export default {
  decorators: [withRouter, withThemeProvider(ThemeController)],
  globals: {
    selectedTheme: 'tenx',
    themes: [
      {
        name: 'tenx',
        color: 'red',
        themeObject: theme,
      },
    ],
  },
  parameters: {
    options: {
      storySort: {
        order: ['*', 'Icons', ['Instructions', 'Gallery', 'Icon', 'Icon Sign']],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: theme.white,
        },
        {
          name: 'cream70',
          value: theme.cream70,
        },
        {
          name: 'charcoal30',
          value: theme.charcoal30,
        },
      ],
      grid: {
        disable: true,
      },
    },
  },
};
