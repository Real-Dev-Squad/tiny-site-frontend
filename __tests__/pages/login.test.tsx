import LoginPage from '../../src/pages/login';
import { render, fireEvent } from '@testing-library/react';

describe('LoginPage', () => {
    it('should render without throwing an error', () => {
        const { container } = render(<LoginPage />);
        expect(container).toMatchSnapshot();
    });

    it('should render username input', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('Username') as HTMLInputElement;
        const passwordInput = getByLabelText('Password') as HTMLInputElement;

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
    });

    it('should render "Forgot password?" link', () => {
        const { getByText } = render(<LoginPage />);
        const forgotPasswordLink = getByText('Forgot password?');
        expect(forgotPasswordLink).toBeInTheDocument();
    });

    it('should apply border styling for valid usernamep', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('Username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'John_doe' } });
        expect(usernameInput).toHaveClass('border-green-500');
    });

    it('should apply border styling for invalid username', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('Username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'invalid-username' } });
        expect(usernameInput).toHaveClass('border-red-500');
    });
});
