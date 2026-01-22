import { useState } from 'preact/hooks';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown/Dropdown';
import { Card } from '../Card/Card';

export type LoginDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    onLogin?: (data: any) => void;
};

export const LoginDrawer = ({ isOpen, onClose, onLogin }: LoginDrawerProps) => {
    const [email, setEmail] = useState('');
    const [customerType, setCustomerType] = useState('');

    const customerTypeOptions = [
        { label: 'Customer', value: 'customer' },
        { label: 'Business', value: 'business' },
    ];

    const handleLogin = (e?: Event) => {
        e?.preventDefault();
        onLogin?.({ email, customerType });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-drawer-title"
        >
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div
                className="absolute inset-y-0 right-0 w-[480px] flex outline-none"
                tabIndex={-1}
            >
                <div className="w-full h-full bg-white shadow-xl transform transition-transform overflow-y-auto">
                    <div className="p-2xl">
                        <div className="flex justify-end  mb-lg">
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className={`text-secondary hover:text-text p-1 hover:bg-tertiary transition-colors cursor-pointer`}
                            >
                                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.79999 0.800049L0.799988 8.80005M0.799988 0.800049L8.79999 8.80005" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-xl">
                            <h2 id="login-drawer-title" className="text-brand-primary leading-heading-h5 text-heading-h4">Log into your account</h2>
                            <p className="mt-xl">Please enter your email for a one-time-only code</p>
                        </div>

                        <form className="mb-xl">
                            <Dropdown
                                label="Customer Type"
                                options={customerTypeOptions}
                                value={customerType}
                                onChange={setCustomerType}
                                icon={false}
                                className='mb-xl'
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                value={email}
                                onInput={(e) => setEmail(e.currentTarget.value)}
                                required={false}
                                className='mb-xl'
                            />

                            <Button
                                type="submit"
                                onClick={handleLogin}
                                className="w-full justify-center mb-md"
                                variant='secondary'
                            >
                                Continue
                            </Button>

                            <Button
                                className="w-full justify-center"
                                variant='tertiary'
                            >
                                Login with your password
                            </Button>
                        </form>
                        <Card
                            title="Join the family."
                            className="w-full"
                            actionLabel="Become a member"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
