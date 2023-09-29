import React from 'react';

type Props = {
    type: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required: boolean;
    className?: string;
};

const InputBox = (props: Props) => {
    const { type, name, onChange, placeholder, required, className } = props;
    return (
        <>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {name}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                onChange={onChange}
                className={className || ''}
                placeholder={placeholder || ''}
                required={required}
            />
        </>
    );
};
export default InputBox;
