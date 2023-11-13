import { fireEvent, render } from '@testing-library/react';

import LoginPage from '../../src/pages/login';

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: () => ({
        query: {},
        push: jest.fn(),
    }),
}));
describe('LoginPage', () => {
    it('should render username input', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('username') as HTMLInputElement;
        const passwordInput = getByLabelText('password') as HTMLInputElement;

        expect(usernameInput).toBeInTheDocument();
        expect(usernameInput).toHaveAttribute('type', 'text');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should handle "Remember me" checkbox', () => {
        const { getByLabelText } = render(<LoginPage />);
        const rememberMeCheckbox = getByLabelText('Remember me') as HTMLInputElement;
        fireEvent.click(rememberMeCheckbox);
        expect(rememberMeCheckbox).toBeChecked();
        expect(rememberMeCheckbox).toHaveAttribute('type', 'checkbox');
    });

    it('should render "Forgot password?" link', () => {
        const { getByText } = render(<LoginPage />);
        const forgotPasswordLink = getByText('Forgot password?');
        expect(forgotPasswordLink).toBeInTheDocument();
    });

    it('should apply border styling for valid username', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'John_doe' } });
        expect(usernameInput).toHaveClass('border-green-500');
    });

    it('should apply border styling for invalid username', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'invalid-username' } });
        expect(usernameInput).toHaveClass('border-red-500');
    });
});
