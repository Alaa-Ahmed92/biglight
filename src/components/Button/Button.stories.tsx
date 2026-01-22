import type { Meta, StoryObj } from '@storybook/preact';
import { Button, ButtonProps } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    arrowLeft: true,
    arrowRight: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    children: {
      control: 'text',
    },
    icon: {
      table: {
        disable: true,
      },
    },
    arrowLeft: {
      table: {
        disable: true,
      },
    },
    arrowRight: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button label',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Button label',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    children: 'Button label',
  },
};