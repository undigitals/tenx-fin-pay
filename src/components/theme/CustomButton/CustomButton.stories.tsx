/* eslint-disable import/no-default-export */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomButton } from './CustomButton';

export default {
  title: 'CustomButton',
  component: CustomButton,
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args) => <CustomButton {...args}>Button</CustomButton>;

export const Default = Template.bind({});
export const Primary = Template.bind({});
Primary.args = { preset: 'primary' };
export const Red = Template.bind({});
Red.args = { preset: 'red' };
export const PrimaryRed = Template.bind({});
PrimaryRed.args = { preset: 'primary-red' };
