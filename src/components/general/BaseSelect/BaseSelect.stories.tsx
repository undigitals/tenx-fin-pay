/* eslint-disable import/no-default-export */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BaseSelect } from './BaseSelect';

export default {
  title: 'Base Select',
  component: BaseSelect,
} as ComponentMeta<typeof BaseSelect>;

const options = ['One', 'Two', 'Three'];

const Template: ComponentStory<typeof BaseSelect> = (args) => <BaseSelect {...args}>Chip</BaseSelect>;

export const Default = Template.bind({
  options,
});
