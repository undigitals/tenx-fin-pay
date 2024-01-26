/* eslint-disable import/no-default-export */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Chip } from './Chip';

export default {
  title: 'Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args}>Chip</Chip>;

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = { preset: 'primary' };

export const Cream = Template.bind({});
Cream.args = { preset: 'cream' };

export const Red = Template.bind({});
Red.args = { preset: 'red' };
