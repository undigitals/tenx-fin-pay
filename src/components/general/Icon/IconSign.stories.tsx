/* eslint-disable import/no-default-export */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SVG_ICONS } from 'assets/iconsList';
import { IconSign } from './IconSign';

const meta: Meta<typeof IconSign> = {
  title: 'Icons/IconSign',
  component: IconSign,
  args: {
    iconName: 'book',
    bgColor: 'gold50',
  },
  argTypes: {
    iconName: {
      options: ['--Empty or wrong name--', ...SVG_ICONS],
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
      },
    },
  },
};

type Story = StoryObj<typeof IconSign>;

export const Default: Story = {
  render: ({ iconName, bgColor }) => <IconSign iconName={iconName} bgColor={bgColor} />,
};

export default meta;
