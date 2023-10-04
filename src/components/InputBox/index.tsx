import React, { SetStateAction, useState } from 'react';
import EyeIcon from '../../../public/assets/icons/eye';
import EyeCloseIcon from '../../../public/assets/icons/eyeClose';

type Props = {
    type: string;
    name: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    value?: string | number | undefined;
    hideLabel?: boolean;
};

const InputBox = (props: Props) => {
    const [showPassword, setShowPassword] = useState<SetStateAction<boolean>>(false);
    const {
        type = 'text',
        name,
        onChange = (e) => e,
        placeholder,
        required = false,
        className,
        disabled = false,
        hideLabel = false,
        value = '',
    } = props;
    const inputType = showPassword ? 'text' : type;
    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {!hideLabel && name}
            </label>
            <div className="relative container mx-auto">
                <input
                    value={value}
                    disabled={disabled}
                    type={inputType}
                    name={name}
                    id={name}
                    onChange={onChange}
                    className={className || ''}
                    placeholder={placeholder || ''}
                    required={required}
                />
                {type == 'password' && (
                    <button
                        data-testid="password-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                        }}
                        className="absolute inset-y-0 right-0 flex items-center justify-items-center h-inherit px-4"
                    >
                        {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                    </button>
                )}
            </div>
        </>
    );
};
export default InputBox;