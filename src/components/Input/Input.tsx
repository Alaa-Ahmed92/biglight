import { JSX } from 'preact';
import { useId, useState } from 'preact/hooks';

export type InputProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  onClear?: () => void;
};

const CloseIcon = ({ error, onClick }: { error?: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-secondary hover:text-text focus:outline-none p-1 rounded-full hover:bg-tertiary transition-colors cursor-pointer ${error ? 'text-dark-error' : ''}`}
  >
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.79999 0.800049L0.799988 8.80005M0.799988 0.800049L8.79999 8.80005" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
);

const SuccessIcon = () => (
  <div className="text-success p-1">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export const Input = ({
  label,
  error,
  success,
  helperText,
  className = '',
  disabled,
  id,
  placeholder,
  value,
  onClear,
  required,
  onInput,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helpTextId = helperText || error ? `${inputId}-desc` : undefined;
  const isControlled = value !== undefined;
  const { defaultValue, ...otherProps } = props;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue !== undefined && currentValue !== '' && currentValue !== null;

  const handleInput = (e: any) => {
    if (!isControlled) {
      setInternalValue(e.currentTarget.value);
    }
    onInput?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
  };

  return (
    <div className={`${className}`}>
      <div className="relative flex">
        <input
          id={inputId}
          disabled={disabled}
          value={currentValue}
          onInput={handleInput}
          placeholder={placeholder || " "}
          className={`peer relative w-full text-left h-[52px] bg-background-brand-primary border-xs border-border ${error ? 'border-dark-error text-dark-error' : ''} rounded-md px-sm py-md outline-none focus:outline-none focus:shadow-none flex justify-between items-center transition-all focus:border-md ${disabled ? 'bg-button-disabled-surface border-button-disabled-surface cursor-not-allowed text-disabled' : ''} ${hasValue && !error && !success ? 'border-lg bg-background' : ''}`}
          aria-invalid={!!error}
          aria-describedby={helpTextId}
          {...otherProps}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={`absolute left-3 bg-background-brand-primary transition-all duration-200 pointer-events-none z-10 translate-y-[14px] text-action-md text-passive peer-focus:translate-y-[-8px] peer-focus:left-xs peer-focus:text-xs peer-focus:text-primary-text peer-focus:bg-white peer-focus:px-2xs peer-[:not(:placeholder-shown)]:translate-y-[-8px] peer-[:not(:placeholder-shown)]:left-xs peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary-text peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2xs ${error ? 'text-dark-error peer-focus:text-dark-error peer-[:not(:placeholder-shown)]:text-dark-error' : ''}`}
          >
            {label}
          </label>
        )
        }

        <div className="absolute right-sm top-1/2 -translate-y-1/2 flex items-center">
          {error && hasValue && onClear && <CloseIcon error={error} onClick={handleClear} />}
          {success && hasValue && <SuccessIcon />}
          {!disabled && !success && !error && hasValue && onClear && (
            <CloseIcon onClick={handleClear} />
          )}
        </div>
      </div>


      {
        required && (
          <p className="mt-xs text-body-xs text-disabled"><span className="text-warning-surface">*</span>required</p>
        )
      }
    </div>
  );
};
