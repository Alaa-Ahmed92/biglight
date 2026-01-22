import { JSX } from 'preact';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
    variant?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    size?: 'small' | 'medium';
    icon?: JSX.Element;
    arrowLeft?: boolean;
    arrowRight?: boolean;
};

export const ArrowLeft = () => (
    <svg width="10" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.80005 8.80005L0.800049 4.80005L4.80005 0.800049" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ArrowRight = () => (
    <svg width="10" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.800049 8.80005L4.80005 4.80005L0.800049 0.800049" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Button = ({
    variant = 'primary',
    size = 'medium',
    children,
    className = '',
    disabled,
    icon,
    arrowLeft,
    arrowRight,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center rounded-round font-sans transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:cursor-not-allowed';

    const variantSize = {
        small: 'px-md py-sm text-action-sm h-10',
        medium: 'px-md py-md text-action-md h-12'
    };

    const iconSize = {
        small: 'h-3 w-3',
        medium: 'h-4 w-4'
    };

    const variants = {
        primary: 'bg-primary text-primary-text hover:bg-primary-hover hover:text-primary-text-hover active:bg-primary-hover disabled:bg-button-disabled-surface disabled:text-disabled',
        secondary: 'bg-secondary text-secondary-text hover:bg-secondary-hover hover:text-primary-text active:bg-secondary-hover disabled:bg-button-disabled-surface disabled:text-disabled',
        tertiary: 'bg-tertiary text-tertiary-text border-md border-solid border-secondary hover:bg-secondary hover:text-primary-text-hover active:bg-tertiary-hover disabled:bg-transparent disabled:text-disabled disabled:border-disabled',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${variantSize[size]} ${className}`}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        >
            {arrowLeft && <span className={`${iconSize[size]} flex items-center justify-center`}><ArrowLeft /></span>}
            {icon && <span className={`${iconSize[size]} flex items-center justify-center`}>{icon}</span>}
            <span className="tracking-[.2px] px-xs">{children}</span>
            {arrowRight && <span className={`${iconSize[size]} flex items-center justify-center`}><ArrowRight /></span>}
        </button>
    );
};
