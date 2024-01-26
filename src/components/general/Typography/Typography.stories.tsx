/* eslint-disable import/no-default-export */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from 'components/general/Icon/Icon';
import { Title } from './Title/Title';
import { BodyText } from './BodyText/BodyText';

const SPACES_MAP = [
  'spacing-tiny',
  'spacing-x-small',
  'spacing-small',
  'spacing-med',
  'spacing-normal',
  'spacing-large',
  'spacing-x-large',
  'spacing-xx-large',
  'spacing-xxx-large',
  'spacing-jumbo',
  'spacing-super-jumbo',
  10,
  0,
];

export default {
  title: 'Typography',
  component: Title || BodyText,
  argTypes: {
    textType: { options: ['bodyText', 'helperText', 'errorText'], control: { type: 'radio' } },
    marginBottom: { options: SPACES_MAP, control: { type: 'select' } },
    marginTop: { options: SPACES_MAP, control: { type: 'select' } },
    marginRight: { options: SPACES_MAP, control: { type: 'select' } },
    marginLeft: { options: SPACES_MAP, control: { type: 'select' } },
    paddingBottom: { options: SPACES_MAP, control: { type: 'select' } },
    paddingTop: { options: SPACES_MAP, control: { type: 'select' } },
    paddingRight: { options: SPACES_MAP, control: { type: 'select' } },
    paddingLeft: { options: SPACES_MAP, control: { type: 'select' } },
    icon: { options: [null, '➤'], control: { type: 'select' } },
  },
} as ComponentMeta<typeof Title | typeof BodyText>;

const TitleTemplate: ComponentStory<typeof Title> = (args) => <Title {...args} />;
const BodyTextTemplate: ComponentStory<typeof BodyText> = (args) => <BodyText {...args} />;

export const TitleComponent = TitleTemplate.bind({});
TitleComponent.args = {
  children: 'Title text',
  fontWeight: 'SM',
  size: 'M',
  color: 'charcoal90',
  textTag: 'h1',
  lineHeight: 1.2,
};

export const BodyTextComponent = BodyTextTemplate.bind({});

BodyTextComponent.args = {
  textType: 'bodyText',
  children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur possimus quae, suscipit odit ullam quia veniam deleniti atque numquam dignissimos!',
  color: 'green',
  textTag: 'p',
  icon: <Icon name="circleInfo" color="green" size="normal" />,
  lineHeight: 1.2,
};
