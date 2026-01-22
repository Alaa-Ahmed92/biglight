import type { Meta, StoryObj } from '@storybook/preact';
import { LoginDrawer, LoginDrawerProps } from './LoginDrawer';
import { useState } from 'preact/hooks';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/LoginDrawer',
  component: LoginDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onLogin: { action: 'login' },
  },
} satisfies Meta<LoginDrawerProps>;

export default meta;
type Story = StoryObj<LoginDrawerProps>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <div className="h-screen w-full p-4">
        <Button onClick={() => setIsOpen(true)}>Open Login Drawer</Button>
        <LoginDrawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
