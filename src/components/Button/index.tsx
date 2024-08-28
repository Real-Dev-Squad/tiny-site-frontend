import React from 'react';

import { ButtonProps } from '@/types/button.types';

import { Loader } from '../Loader';

const Button: React.FC<ButtonProps> = ({ type, className, onClick, children, disabled, testId, loading }) => {
    return (
        <button data-testid={testId} type={type} className={className} onClick={onClick} disabled={disabled || loading}>
            {loading && <Loader className="inline-block w-5 h-5" />}
            {children}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    className: 'w-full bg-gray-200 hover:bg-gray-300 ',
    loading: false,
};

export default Button;
