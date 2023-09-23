import React from 'react';
import '@/styles/global.css';

interface ButtonProps {
    label?: string;
    handleClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    disabled = false,
    size = 'medium',
    type = 'button',
    handleClick = () => {},
}) => {
    const buttonClasses = `
    ${variant === 'primary' ? 'bg-primary' : 'bg-secondary'}
    text-white hover:bg-secondary hover:text-white
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${size === 'small' ? 'px-2 py-1 text-sm' : ''}
    ${size === 'medium' ? 'px-4 py-2 text-md' : ''}
    ${size === 'large' ? 'px-6 py-3 text-lg' : ''}
    ${size === 'xlarge' ? 'px-8 py-4 text-xl' : ''}
    text-white rounded border-none cursor-pointer font-semibold transition duration-200 ease-in-out hover:text-black hover:border-6 border-black
  `;

    return (
        <button disabled={disabled} type={type} className={buttonClasses} onClick={handleClick}>
            {label}
        </button>
    );
};

export { Button };
