import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: string;
}

const Button: React.FC<ButtonProps> = ({ type, className, onClick, children }) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export { Button };
