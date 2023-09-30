import React, { SetStateAction, useState } from 'react';
import EyeIcon from '../../../public/assets/eye';
import EyeCloseIcon from '../../../public/assets/icons/eyeClose';

type Props = {
    type: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required: boolean;
    className?: string;
};

const InputBox = (props: Props) => {
    const [showPassword, setshowPassword] = useState<SetStateAction<boolean>>(false);
    const { type, name, onChange, placeholder, required, className } = props;

    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {name}
            </label>
            <div className="relative container mx-auto">
                <input
                    type={type == 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                    name={name}
                    id={name}
                    onChange={onChange}
                    className={className || ''}
                    placeholder={placeholder || ''}
                    required={required}
                />
                {name == 'Password' && (
                    <button
                        data-testid="password-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            setshowPassword(!showPassword);
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
