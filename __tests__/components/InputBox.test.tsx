import InputBox from '@/components/InputBox';
import { fireEvent, render } from '@testing-library/react';

describe('InputBox', () => {
    it('should render InputBox', () => {
        const { container } = render(
            <InputBox
                type="text"
                name="Username"
                onChange={(e) => e}
                placeholder="John_Doe"
                className="bg-gray-50  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
            />
        );
        expect(container).toHaveTextContent('Username');
    });
    it('should have a password field if the type is "password"', () => {
        const { getByLabelText, getByTestId } = render(
            <InputBox
                type="password"
                name="Password"
                onChange={(e) => e}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
            />
        );
        const passwordInput = getByLabelText('Password');
        const toggleButton = getByTestId('password-toggle');

        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByTestId('password-toggle')).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });
});
