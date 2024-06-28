import React from 'react';
import { CiWarning } from 'react-icons/ci';

import Button from '@/components/Button';

const ErrorPage = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <section className="w-screen min-h-screen flex flex-col items-center justify-center bg-custom-purple text-white p-4">
            <CiWarning className="text-[6rem] font-bold" />
            <p className="text-4xl font-bold">Oops!</p>
            <p className="text-lg mt-2 text-center">Something went wrong. Please try again.</p>
            <Button
                onClick={handleReload}
                className="mt-6 py-2 px-4 bg-blue-500 rounded-md text-white cursor-pointer outline-none hover:bg-blue-800"
            >
                Reload
            </Button>
        </section>
    );
};

export default ErrorPage;
