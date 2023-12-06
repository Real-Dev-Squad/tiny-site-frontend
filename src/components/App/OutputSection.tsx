import Link from 'next/link';
import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoIosCopy } from 'react-icons/io';
import { IoIosShareAlt } from 'react-icons/io';

import Button from '@/components/Button';
import { removeProtocol } from '@/constants/constants';

import OutputSectionShimmer from '../ShimmerEffect/OutputSectionShimmer';

interface OutputSectionProps {
    originalUrl: string;
    shortUrl: string;
    isLoaded: boolean;
    handleCreateNew: () => void;
    handleCopyUrl: () => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({
    shortUrl,
    originalUrl,
    isLoaded,
    handleCopyUrl,
    handleCreateNew,
}) => {
    if (!isLoaded) {
        return <OutputSectionShimmer />;
    }

    return (
        <section
            className="flex flex-col justify-between items-center  rounded-2xl mt-5 sm:mt-10 w-[80%] text-gray-400"
            data-testid="output-section"
        >
            <h1 className="text-2xl md:text-3xl xl:text-3xl text-center mb-2 text-white font-semibold">
                Your Tiny URL is ready! 🎉🎉
            </h1>
            <span className="ml-2 p-4 text-center w-full sm:w-[60%] ellipsis overflow-hidden overflow-ellipsis whitespace-nowrap">
                {originalUrl}
            </span>
            <AiOutlineArrowDown style={{ fontSize: '5rem', paddingBottom: '15px' }} />

            <div
                className="text-white flex flex-col md:flex-row justify-center items-center  rounded-2xl w-auto cursor-pointer bg-black p-2"
                onClick={handleCopyUrl}
            >
                <span className="ml-2 p-4 text-center w-full sm:w-[80%] ellipsis overflow-hidden overflow-ellipsis whitespace-nowrap sm:text-2xl md:text-3xl xl:text-3xl">
                    {shortUrl.replace(removeProtocol, '')}
                </span>
                <div className="flex w-full sm:w-[80%] md:w-[20%] justify-center items-center space-x-2 rounded-2xl px-2">
                    <Link
                        type="button"
                        className="bg-gray-900 p-[6px] sm:p-[10px]  hover:bg-gray-800 w-[50%] rounded-l-2xl after:content-['Visit'] md:after:content-[''] flex justify-center items-center"
                        href={shortUrl}
                        target="_blank"
                        data-testid="share-button"
                        rel="noopener noreferrer"
                    >
                        <IoIosShareAlt className="text-4xl sm:text-[2.5rem] " />
                        &nbsp;
                    </Link>

                    <Button
                        type="button"
                        className="bg-gray-900 md:rounded-r-2xl p-[6px] sm:p-[10px]  hover:bg-gray-800  w-[50%] rounded-r-2xl md:rounded-none flex justify-center items-center after:content-['Copy'] md:after:content-['']"
                        testId="copy-button"
                        onClick={handleCopyUrl}
                    >
                        <IoIosCopy className="text-4xl sm:text-[2.5rem] " />
                        &nbsp;
                    </Button>
                </div>
            </div>

            <Button
                className="fixed bottom-10 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
                testId="create-new-button-mobile"
                onClick={handleCreateNew}
            >
                <FaPlus size={20} />
            </Button>
            <Button
                className="mt-10 text-white p-3 rounded-full shadow-lg cursor-pointer hover:underline text-[20px]"
                testId="create-new-button"
                onClick={handleCreateNew}
            >
                Create New
            </Button>
        </section>
    );
};

export default OutputSection;
