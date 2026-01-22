import { useState, useRef, useEffect } from 'preact/hooks';
import { TargetedKeyboardEvent } from 'preact';

export type Option = {
    label: string;
    value: string;
};

export type DropdownProps = {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string | boolean;
    required?: boolean;
    className?: string;
    icon?: boolean;
};

export const Dropdown = ({
    options,
    value,
    onChange,
    label,
    disabled = false,
    required,
    className = '',
    icon,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            const index = options.findIndex(opt => opt.value === value);
            setFocusedIndex(index >= 0 ? index : 0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && listRef.current && focusedIndex >= 0) {
            const element = listRef.current.children[focusedIndex] as HTMLElement;
            if (element) {
                element.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [focusedIndex, isOpen]);

    const handleSelect = (optionValue: string) => {
        if (!disabled) {
            onChange?.(optionValue);
            setIsOpen(false);
        }
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleKeyDown = (e: TargetedKeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (isOpen) {
                    if (focusedIndex >= 0 && focusedIndex < options.length) {
                        handleSelect(options[focusedIndex].value);
                    }
                } else {
                    setIsOpen(true);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    setFocusedIndex((prev) => (prev + 1) % options.length);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                } else {
                    setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                break;
        }
    };

    const isFloating = isOpen || !!selectedOption;

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>

            <button
                type="button"
                className={`relative w-full text-left h-[52px] bg-background-brand-primary border-xs border-border rounded-md px-sm py-md flex justify-between items-center transition-all focus:border-md ${disabled ? 'bg-button-disabled-surface border-button-disabled-surface cursor-not-allowed text-disabled' : 'cursor-pointer'} ${selectedOption ? 'border-lg bg-background' : ''}`}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                disabled={disabled}
            >
                {label && (
                    <div className="flex items-center">
                        {icon && (<span>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.46667 3.46672V7.46672L10.1333 8.80005M14.1333 7.46672C14.1333 11.1486 11.1486 14.1334 7.46667 14.1334C3.78477 14.1334 0.8 11.1486 0.8 7.46672C0.8 3.78482 3.78477 0.800049 7.46667 0.800049C11.1486 0.800049 14.1333 3.78482 14.1333 7.46672Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>)}
                        <label className={`absolute ${icon ? 'left-xl' : 'left-xs'} bg-background-brand-primary px-1 transition-all duration-200 pointer-events-none z-10 ${isFloating
                            ? 'translate-y-[-26px] left-xs text-xs text-primary-text bg-white px-2xs'
                            : '-translate-y-0 text-action-md text-passive'
                            }`}>
                            {label}
                        </label>
                        <span className="ml-2 pr-md">{selectedOption?.label}</span>
                    </div>
                )
                }
                <span className={`pointer-events-none absolute inset-y-0 right-3 flex items-center transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${disabled ? 'text-disabled' : 'text-secondary'}`}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.800003 0.800049L4.8 4.80005L8.8 0.800049" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </button >

            {isOpen && (
                <ul
                    ref={listRef}
                    className="absolute z-[99] mt-xs max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-dropdown ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    role="listbox"
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            className={`relative cursor-pointer select-none px-sm py-sm text-text ${focusedIndex === index ? 'bg-tertiary-hover' : ''} hover:bg-tertiary-hover`}
                            role="option"
                            aria-selected={option.value === value}
                            onClick={() => handleSelect(option.value)}
                            onMouseEnter={() => setFocusedIndex(index)}
                        >
                            <span className={`block truncate ${option.value === value ? 'font-semibold' : 'font-normal'}`}>
                                {option.label}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            {
                required && (
                    <p className="mt-xs text-body-xs text-disabled"><span className="text-warning-surface">*</span>required</p>
                )
            }
        </div>
    );
};
