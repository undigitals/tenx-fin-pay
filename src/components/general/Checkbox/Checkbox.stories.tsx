/* eslint-disable import/no-default-export */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args}>Checkbox</Checkbox>;

export const Default = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Red = Template.bind({});
Red.args = { isError: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
