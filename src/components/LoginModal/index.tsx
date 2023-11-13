import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import { TINY_API_GOOGLE_LOGIN } from '@/constants/url';

import Button from '../Button';
import GoogleIcon from '../icons/google';

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
                className="bg-gray-800 p-8 rounded-md w-96 relative flex flex-col justify-center items-center border border-gray-500"
            >
                <Button className="absolute top-2 right-2 text-white" testId="close-login-modal" onClick={onClose}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </Button>
                <h2 className="text-2xl font-bold mb-4 text-white">URL Shortener</h2>
                {children}
                <Link href={TINY_API_GOOGLE_LOGIN}>
                    <span className="bg-white text-black px-4 py-2 rounded flex items-center justify-center border border-gray-300 hover:bg-gray-300 cursor-pointer">
                        <GoogleIcon />
                        Sign in with Google
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default LoginModal;
