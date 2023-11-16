import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 flex justify-center items-center h-[6vh]">
            <p className="text-gray-200 text-sm text-center">
                The contents of this website are deployed from this{' '}
                <Link
                    href="https://github.com/Real-Dev-Squad/tiny-site-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    open sourced repo
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
