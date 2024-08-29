import Link from 'next/link';
import React from 'react';

import SignInWithGoogleIcon from '@/components/icons/signWithGoogle';
import Modal from '@/components/Modal';
import { TINY_API_GOOGLE_LOGIN } from '@/constants/url';

interface LoginModalProps {
    onClose: () => void;
    children?: React.ReactNode;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, children }) => {
    return (
        <Modal onClose={onClose} title="Please log in" width="400px" padding="34px" data-testid="modal">
            {children}
            <Link
                href={TINY_API_GOOGLE_LOGIN}
                data-testid="sign-in-with-google-button"
                className="flex items-center justify-center"
            >
                <SignInWithGoogleIcon />
            </Link>
        </Modal>
    );
};

export default LoginModal;
