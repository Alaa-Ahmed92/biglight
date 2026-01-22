import type { Meta, StoryObj } from '@storybook/preact';
import { Dropdown, DropdownProps } from './Dropdown';
import { useState } from 'preact/hooks';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300px', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<DropdownProps>;

export default meta;
type Story = StoryObj<DropdownProps>;

const options = [
  { label: 'Retail Store Owner', value: '1' },
  { label: 'Convenience Shop', value: '2' },
  { label: 'Hospitality', value: '3' },
  { label: 'Catering & Events', value: '4' },
  { label: 'Online/Delivery Only', value: '5' },
  { label: 'Hospitality', value: '6' },
  { label: 'Catering & Events', value: '7' },
  { label: 'Online/Delivery Only', value: '8' }
];

export const Default: Story = {
  args: {
    label: 'Label',
    options,
    required: true,
    icon: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
};