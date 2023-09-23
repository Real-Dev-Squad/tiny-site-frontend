import React from 'react';
import '@/styles/global.css';

interface InputBoxProps {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    type?: 'text' | 'number' | 'password';
    placeholder?: string;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    value?: string;
    onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
    size = 'medium',
    type = 'text',
    placeholder = 'Enter text',
    disabled = false,
    variant = 'primary',
    onChangeHandler = () => {},
}) => {
    const inputBoxClasses = `
    ${variant === 'primary' ? 'bg-primary' : 'bg-secondary'}
    text-white 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${size === 'small' ? 'px-2 py-1 text-sm' : ''}
    ${size === 'medium' ? 'px-4 py-2 text-md' : ''}
    ${size === 'large' ? 'px-6 py-3 text-lg' : ''}
    ${size === 'xlarge' ? 'px-8 py-4 text-xl' : ''}
    text-white rounded border-none cursor-pointer font-semibold transition duration-200 ease-in-out 
  `;

    return (
        <input
            disabled={disabled}
            type={type}
            className={inputBoxClasses}
            placeholder={placeholder}
            onChange={onChangeHandler}
        />
    );
};

export { InputBox };
