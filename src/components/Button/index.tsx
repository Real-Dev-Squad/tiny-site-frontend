import React from 'react';

import { ButtonProps } from '@/types/button.types';

const Button: React.FC<ButtonProps> = ({ type, className, onClick, children, disabled, testId }) => {
    return (
        <button data-testid={testId} type={type} className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    className: 'w-full bg-gray-200 hover:bg-gray-300 ',
};

export default Button;
