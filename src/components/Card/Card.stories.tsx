import type { Meta, StoryObj } from '@storybook/preact';
import { Card, CardProps } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    actionLabel: { control: 'text' },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    title: `Join the \nfamily.`,
    actionLabel: 'Join',
    size: 'medium',
  },
};