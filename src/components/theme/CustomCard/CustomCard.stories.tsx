/* eslint-disable import/no-default-export */
// noinspection JSUnusedGlobalSymbols

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomCard } from './CustomCard';

export default {
  title: 'CustomCard',
  component: CustomCard,
} as ComponentMeta<typeof CustomCard>;

const Template: ComponentStory<typeof CustomCard> = (args) => <CustomCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>This is custom card content</div>,
};
Default.parameters = {
  backgrounds: { default: 'cream70' },
};
