import React from 'react';

import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';

import CopyIcon from './../../public/assets/icons/copy';
import AddIcon from './../../public/assets/icons/add';
import ReloadIcon from './../../public/assets/icons/reload';

export default function Home() {
    const [url, getUrl] = React.useState('');
    const [shortUrl, setUrl] = React.useState('');

    function generateRandomString() {
        const randomString = Math.random().toString(36).substring(2, 7);
        return randomString;
    }
    return (
        <div>
            <Navbar />
            <div className="bg-gray-900 flex flex-col justify-center items-center h-[86vh]">
                <div className="flex flex-col justify-center items-center space-y-4 w-[60%] h-[50%]">
                    <h1 className="text-4xl text-white font-semibold">URL Shortener</h1>
                    <div className="flex flex-row justify-center items-center space-x-1 m-4 w-[100%]">
                        <input
                            type="text"
                            placeholder="Enter the URL"
                            className="w-[80%] bg-gray-200 rounded-l-2xl p-4"
                            value={url}
                            onChange={(e) => {
                                getUrl(e.target.value);
                            }}
                        />
                        <button
                            className="bg-gray-200 rounded-r-2xl px-8 py-4 hover:bg-gray-300"
                            onClick={() => {
                                const randomString = generateRandomString();
                                setUrl(`https://rds.li/${randomString}`);
                            }}
                        >
                            Generate
                        </button>
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-1 m-4 w-[100%]">
                        <input
                            type="text"
                            placeholder="Copy the URL"
                            className="bg-gray-200 rounded-l-2xl p-4 w-[77%]"
                            disabled
                            value={shortUrl}
                        />
                        <div className="flex flex-row justify-center items-center space-x-1">
                            <button
                                className="bg-gray-200 p-3 hover:bg-gray-300"
                                onClick={() => {
                                    const randomString = generateRandomString();
                                    setUrl(`https://rds.li/${randomString}`);
                                }}
                            >
                                <ReloadIcon />
                            </button>
                            <button
                                className="bg-gray-200 p-3 hover:bg-gray-300"
                                onClick={() => {
                                    setUrl('');
                                }}
                            >
                                <AddIcon />
                            </button>
                            <button
                                className="bg-gray-200 rounded-r-2xl p-3 hover:bg-gray-300"
                                onClick={() => {
                                    navigator.clipboard.writeText(shortUrl);
                                }}
                            >
                                <CopyIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
