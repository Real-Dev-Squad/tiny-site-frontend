import React from 'react';
import { render } from '@testing-library/react';
import Button from '@/components/Button';
Button;

describe('Button', () => {
    it('should render Button', () => {
        const handleOnClickMock = jest.fn();
        const { getByRole } = render(
            <Button
                type="button"
                className="w-full md:w-auto bg-gray-200 px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                onClick={handleOnClickMock}
            >
                Generate
            </Button>
        );
        const buttonElement = getByRole('button');
        expect(buttonElement).toHaveAttribute('type', 'button');
        expect(buttonElement).toHaveTextContent('Generate');
    });

    test('should render button with the type submit', () => {
        const handleOnClickMock = jest.fn();
        const { getByRole } = render(
            <Button
                type="submit"
                className="w-full md:w-auto bg-gray-200 px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                onClick={handleOnClickMock}
            >
                Log in
            </Button>
        );

        const buttonElement = getByRole('button');
        expect(buttonElement).toHaveAttribute('type', 'submit');
    });
});
