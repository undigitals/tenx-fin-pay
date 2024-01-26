/* eslint-disable import/no-default-export */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RadioButton } from './RadioButton';

export default {
  title: 'RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = ({ children, ...args }) => <RadioButton {...args}>{children}</RadioButton>;

export const Default = Template.bind({});
Default.args = {
  isError: false,
  children: 'Radio',
  checked: false,
  disabled: false,
};

export const Checked = Template.bind({});
Checked.args = {
  isError: false,
  children: 'Checked',
  checked: true,
};
export const Disabled = Template.bind({});
Disabled.args = {
  isError: false,
  children: 'Disabled',
  disabled: true,
};
export const Error = Template.bind({});
Error.args = {
  isError: true,
  children: 'Error',
  errorText: 'No long error text',
};
