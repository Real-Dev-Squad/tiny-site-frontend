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
        <Modal onClose={onClose} title="Please log in" width="330px">
            {children || <h2 className="text-2xl font-bold mb-4 text-black">Please log in</h2>}
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
