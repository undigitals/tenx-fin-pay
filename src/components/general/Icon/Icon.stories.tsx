/* eslint-disable import/no-default-export */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SVG_ICONS } from 'assets/iconsList';
import { ICON_SIZE_MAP } from './Icon.constants';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Icons/Icon',
  component: Icon,
  args: {
    name: 'bell',
    size: 'normal',
  },
  argTypes: {
    name: {
      options: ['--Empty or wrong name--', ...SVG_ICONS],
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
    size: {
      options: Object.keys(ICON_SIZE_MAP),
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
  },
};

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: ({ name, size }) => <Icon name={name} size={size} />,
};

export default meta;
