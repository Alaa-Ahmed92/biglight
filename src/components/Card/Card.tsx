import { ComponentChildren } from 'preact';
import { Button } from '../Button/Button';
import cardPlaceholder from '../../assets/images/card-placeholder.png';

export type CardProps = {
    title: string;
    actionLabel?: string;
    onAction?: () => void;
    children?: ComponentChildren;
    className?: string;
    size?: 'small' | 'medium';
};

const UserIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10.5V9.5C10 8.96957 9.78929 8.46086 9.41421 8.08579C9.03914 7.71071 8.53043 7.5 8 7.5H4C3.46957 7.5 2.96086 7.71071 2.58579 8.08579C2.21071 8.46086 2 8.96957 2 9.5V10.5M8 3.5C8 4.60457 7.10457 5.5 6 5.5C4.89543 5.5 4 4.60457 4 3.5C4 2.39543 4.89543 1.5 6 1.5C7.10457 1.5 8 2.39543 8 3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

export const Card = ({
    title,
    actionLabel,
    onAction,
    className = '',
    size = 'medium',
}: CardProps) => {
    const cardSize = {
        small: 'p-md text-mobile-heading-h5 leading-heading-h5 w-[295px] h-[138px]',
        medium: 'p-lg text-heading-h5 leading-heading-h5 w-[394px] h-[194px]',
    };

    const imageSize = {
        small: 'w-[85px]',
        medium: 'w-[144px]',
    }

    return (
        <div className={`bg-brand-primary text-white rounded-xl overflow-hidden flex ${cardSize[size]} ${className}`}>
            <div className="flex justify-between w-full">
                <div className="mr-lg flex flex-col justify-between">
                    <h3 className="whitespace-pre-line">{title}</h3>
                    {actionLabel && (
                        <div className="">
                            <Button onClick={onAction} size="small" icon={<UserIcon />}>
                                {actionLabel}
                            </Button>
                        </div>
                    )}
                </div>
                <div>
                    <img src={cardPlaceholder} alt={title} className={imageSize[size]} />
                </div>
            </div>
        </div >
    );
};
