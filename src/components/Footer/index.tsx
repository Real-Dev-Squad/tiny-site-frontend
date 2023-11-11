import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="bg-gray-200 flex justify-center items-center h-[6vh]">
            <p className="text-gray-600 text-sm text-center">
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
        </div>
    );
};

export default Footer;
