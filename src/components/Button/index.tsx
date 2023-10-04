import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, className, onClick, children }) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    className: 'w-full bg-gray-200 hover:bg-gray-300 ',
};

export { Button };
