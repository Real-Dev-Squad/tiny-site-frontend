import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import { TINY_API_GOOGLE_LOGIN } from '@/constants/url';

import Button from '../Button';
import SignInWithGoogleIcon from '../icons/signWithGoogle';

interface LoginModalProps {
    onClose: () => void;
    children?: React.ReactNode;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div
                ref={modalRef}
                className="bg-gray-800 p-8 rounded-md w-[330px] relative flex flex-col justify-center items-center border border-gray-500"
            >
                <Button className="absolute top-2 right-2 text-white" testId="close-login-modal" onClick={onClose}>
                    <IoCloseSharp style={{ fontSize: '1.5em' }} />
                </Button>
                <h2 className="text-2xl font-bold mb-4 text-white">Please log in</h2>
                {children}
                <Link
                    href={TINY_API_GOOGLE_LOGIN}
                    data-testid="sign-in-with-google-button"
                    className="flex items-center justify-center"
                >
                    <SignInWithGoogleIcon />
                </Link>
            </div>
        </div>
    );
};

export default LoginModal;
