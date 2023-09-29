import React, { useState } from 'react';
import CopyIcon from '../../../public/assets/icons/copy';
import AddIcon from '../../../public/assets/icons/add';
import ReloadIcon from '../../../public/assets/icons/reload';

const Dashboard = () => {
    const [url, getUrl] = useState('');
    const [shortUrl, setUrl] = useState('');

    function generateRandomString() {
        const randomString = Math.random().toString(36).substring(2, 7);
        return randomString;
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-4 w-[90%] max-w-3xl md:w-[80%] lg:w-[80%] h-screen">
            <h1 className="text-4xl text-white font-semibold">URL Shortener</h1>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-1 m-4 w-[100%]">
                <input
                    type="text"
                    placeholder="Enter the URL"
                    className="w-full md:w-[80%] bg-gray-200 md:rounded-l-2xl p-4 md:rounded-none"
                    value={url}
                    onChange={(e) => {
                        getUrl(e.target.value);
                    }}
                />
                <button
                    className="w-full md:w-auto bg-gray-200 md:rounded-r-2xl px-4 md:px-8 py-4 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                    onClick={() => {
                        const randomString = generateRandomString();
                        setUrl(`https://rds.li/${randomString}`);
                    }}
                >
                    Generate
                </button>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-1 m-4 w-[98%]">
                <input
                    type="text"
                    placeholder="Copy the URL"
                    className="w-full md:w-[80%] bg-gray-200 md:rounded-l-2xl p-4 md:rounded-none"
                    disabled
                    value={shortUrl}
                />
                <div className="flex flex-row justify-center items-center space-x-1">
                    <button
                        className="w-full md:w-auto bg-gray-200  px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                        onClick={() => {
                            const randomString = generateRandomString();
                            setUrl(`https://rds.li/${randomString}`);
                        }}
                    >
                        <ReloadIcon />
                    </button>
                    <button
                        className="w-full md:w-auto bg-gray-200 px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                        onClick={() => {
                            setUrl('');
                        }}
                    >
                        <AddIcon />
                    </button>
                    <button
                        className="w-full md:w-auto bg-gray-200 md:rounded-r-2xl px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                        onClick={() => {
                            navigator.clipboard.writeText(shortUrl);
                        }}
                    >
                        <CopyIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
