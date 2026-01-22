import type { Meta, StoryObj } from '@storybook/preact';
import { Input, InputProps } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300px', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    label: 'Input label',
    required: true,
    onClear: () => { },
  },
};