import { fireEvent, render, screen } from '@testing-library/react';

import LoginModal from '@/components/LoginModal';

describe('LoginModal Component', () => {
    const onClose = jest.fn();

    test('renders the LoginModal component with close button', () => {
        render(
            <LoginModal
                onClose={() => {
                    onClose();
                }}
            />
        );
        const closeButton = screen.getByTestId('close-login-modal');
        expect(closeButton).toBeInTheDocument();
    });

    test('renders the LoginModal component with title and sign in with google button', () => {
        render(
            <LoginModal
                onClose={() => {
                    onClose();
                }}
            />
        );
        const title = screen.getByText('Please log in');
        expect(title).toBeInTheDocument();
        const signInWithGoogleButton = screen.getByTestId('sign-in-with-google-button');
        expect(signInWithGoogleButton).toBeInTheDocument();
    });

    test('closes the modal when clicking outside the modal', () => {
        render(
            <LoginModal
                onClose={() => {
                    onClose();
                }}
            />
        );
        const modal = screen.getByTestId('login-modal');
        expect(modal).toBeInTheDocument();
        const body = document.querySelector('body');
        fireEvent.mouseDown(body as HTMLElement);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
