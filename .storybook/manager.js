import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import { tenxLayoutLogo } from './../src/assets/images';

const customTheme = create({
  base: 'light',
  brandImage: tenxLayoutLogo,
  brandTitle: 'Tenx 1.0 Webapp Storybook',
});

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
  },
});
