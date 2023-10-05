import React, { SetStateAction, useState } from 'react';
import EyeIcon from '../../../public/assets/icons/eye';
import EyeCloseIcon from '../../../public/assets/icons/eyeClose';
import { Button } from '../Button';

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
    const handlePasswordToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
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
                {type === 'password' && (
                    <Button
                        type="button"
                        testId="password-toggle"
                        onClick={(e) => handlePasswordToggle(e)}
                        className="absolute inset-y-0 right-0 flex items-center justify-items-center h-inherit px-4"
                    >
                        {!showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                    </Button>
                )}
            </div>
        </>
    );
};
export default InputBox;
