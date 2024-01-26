/* eslint-disable import/no-default-export */
// noinspection JSUnusedGlobalSymbols

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Stepper } from './Stepper';

export default {
  title: 'Stepper',
  component: Stepper,
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (args) => <Stepper {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'],
  currentStep: 3,
};
