import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoIosCopy } from 'react-icons/io';
import { IoIosShareAlt } from 'react-icons/io';

import Button from '@/components/Button';

interface OutputSectionProps {
    originalUrl: string;
    shortUrl: string;
    handleCreateNew: () => void;
    handleCopyUrl: () => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({ shortUrl, originalUrl, handleCopyUrl, handleCreateNew }) => (
    <section className="flex flex-col   justify-between items-center space-y-0 space-x-0 rounded-2xl mt-5 sm:mt-10 w-[100%] text-gray-400">
        <h1 className="text-3xl md:text-4xl xl:text-4xl text-center mb-8 text-white font-semibold">
            Your Tiny URL is ready! 🎉🎉
        </h1>
        <span className="ml-2 p-4 text-center w-full sm:w-[80%] ellipsis overflow-hidden overflow-ellipsis whitespace-nowrap">
            {originalUrl}
        </span>
        <AiOutlineArrowDown style={{ fontSize: '3rem' }} />

        <div
            className="border-2 border-gray-600 text-white flex flex-col md:flex-row justify-center items-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 rounded-2xl w-full  lg:w-[80%] xl:w-[80%] cursor-pointer"
            onClick={handleCopyUrl}
        >
            <span className="ml-2 p-4 text-center w-full sm:w-[80%] sm:text-2xl md:text-3xl xl:text-3xl">
                {shortUrl.replace(/(^\w+:|^)\/\//, '')}
            </span>
            <div className="flex w-full sm:w-[50%] md:w-[20%] justify-center items-center space-y-0 space-x-0 sm:space-x-3 rounded-2xl md:px-2  ">
                <Link
                    type="button"
                    className="md:p-4 hover:bg-gray-400 w-full sm:w-[50%] rounded-l-2xl md:rounded-none after:content-['Visit'] md:after:content-[''] flex justify-center items-center sm:px-4 py-1"
                    href={shortUrl}
                    target="_blank"
                    data-testid="share-button"
                    rel="noopener noreferrer"
                >
                    <IoIosShareAlt style={{ fontSize: '2rem' }} />
                    &nbsp;
                </Link>
                <Button
                    type="button"
                    className="md:rounded-r-2xl md:py-5 md:px-4 hover:bg-gray-600  w-full sm:w-[50%] rounded-r-2xl md:rounded-none flex justify-center items-center after:content-['Copy'] md:after:content-[''] sm:px-4 sm:py-1 py-2"
                    testId="copy-button"
                    onClick={handleCopyUrl}
                >
                    <IoIosCopy style={{ fontSize: '1.5rem' }} />
                    &nbsp;
                </Button>
            </div>
        </div>

        <Button
            className={`fixed bottom-6 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer ${
                window.innerWidth <= 768 ? 'hidden sm:block' : 'block sm:hidden'
            }`}
            onClick={handleCreateNew}
        >
            <FaPlus size={20} />
        </Button>

        <Button
            className={`mt-10 text-white p-3 rounded-full shadow-lg cursor-pointer hover:underline ${
                window.innerWidth <= 768 ? 'block sm:hidden' : 'hidden sm:block'
            }`}
            onClick={handleCreateNew}
        >
            Create New
        </Button>
    </section>
);

export default OutputSection;
