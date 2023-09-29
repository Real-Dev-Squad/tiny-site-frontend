import LoginPage from '../../src/pages/login';
import { render, fireEvent } from '@testing-library/react';

describe('LoginPage', () => {
    it('should render without throwing an error', function () {
        const { container } = render(<LoginPage />);
        expect(container).toMatchSnapshot();
    });
    it('should render username input', () => {
        const { getByLabelText } = render(<LoginPage />);
        expect(getByLabelText('Username')).toBeInTheDocument();
        expect(getByLabelText('Username')).toHaveAttribute('type', 'text');
    });
    it('should render password input', () => {
        const { getByLabelText } = render(<LoginPage />);
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByLabelText('Password')).toHaveAttribute('type', 'password');
    });
    it('should render the `Login` button', () => {
        const { getByText } = render(<LoginPage />);
        expect(getByText('Log in')).toBeInTheDocument();
    });
    it('should accept valid username that takes only alphanumeric characters and underscore', () => {
        const { getByLabelText } = render(<LoginPage />);
        const usernameInput = getByLabelText('Username') as HTMLInputElement;
        usernameInput.value = 'John_doe';
        expect(usernameInput.value).toBe('John_doe');
    });
    it('should not accept invalid username that doesnt take only alphanumeric characters and underscore', () => {
        const { getByLabelText } = render(<LoginPage />);
        const input = getByLabelText('Username');
        fireEvent.change(input, { target: { value: 'valid_username' } });
        expect(input).toHaveStyle('border-color: `#65a30d');

        fireEvent.change(input, { target: { value: 'invalid-username' } });
        expect(input).toHaveStyle('border-color: `#ef4444`');
    });
});
