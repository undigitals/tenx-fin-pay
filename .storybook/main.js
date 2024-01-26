module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-backgrounds',
    '@storybook/blocks',
    '@storybook/preset-create-react-app',
    'storybook-addon-theme-provider',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  features: {
    previewMdx2: true,
    storyStoreV7: false,
  },

  docs: {
    autodocs: true,
  },
};
