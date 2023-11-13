import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <p className="text-4xl font-bold">404 - Not Found</p>
            <p className="text-lg mt-2">The requested URL was not found.</p>
            <Link href="/">
                <p className="mt-4 p-2 bg-blue-500 text-white rounded-md">Create New Short URL</p>
            </Link>
        </div>
    );
};

export default NotFound;
