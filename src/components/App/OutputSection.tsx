import Link from 'next/link';
import QRCode from 'qrcode.react';
import React from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
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

const OutputSection: React.FC<OutputSectionProps> = ({ shortUrl, isLoaded, handleCopyUrl, handleCreateNew }) => {
    if (!isLoaded) {
        return <OutputSectionShimmer />;
    }

    const handleDownload = () => {
        const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `${shortUrl.split('/').pop()}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <>
            <section
                className="flex flex-col justify-between items-center rounded-lg mt-5 sm:mt-10 w-[80%] text-gray-400"
                data-testid="output-section"
            >
                <h1 className="text-xl md:text-2xl xl:text-2xl text-center mb-2 text-white font-semibold">
                    Your shortened URL is ready!
                </h1>
                <QRCode
                    data-testid="qrcode"
                    id="qr-code"
                    value={shortUrl}
                    size={110}
                    includeMargin={true}
                    className="my-4"
                />
                <Button
                    className="bg-gray-900 flex items-center gap-1 p-[6px] sm:p-[10px] rounded-2xl text-white mb-4 xl:w-36 justify-center"
                    onClick={handleDownload}
                >
                    <HiOutlineDownload />
                    Download
                </Button>
                <div className="text-white flex flex-col md:flex-row justify-center items-center rounded-2xl w-auto p-2 border-2 h-11">
                    <span className="ml-2 p-4 text-center w-full sm:w-[80%] ellipsis overflow-hidden overflow-ellipsis whitespace-nowrap sm:text-2xl md:text-3xl xl:text-3xl">
                        {shortUrl.replace(removeProtocol, '')}
                    </span>
                    <div className="flex w-full sm:w-[80%] md:w-auto justify-center items-center space-x-2 rounded-2xl px-2">
                        <Link
                            type="button"
                            className=" p-[6px] sm:p-[10px] w-[50%] rounded-l-2xl flex justify-center items-center"
                            href={shortUrl}
                            target="_blank"
                            data-testid="share-button"
                            rel="noopener noreferrer"
                        >
                            <IoIosShareAlt className="text-2xl sm:text-[1.5rem]" />
                        </Link>

                        <Button
                            type="button"
                            className=" p-[6px] sm:p-[10px] w-[50%] md:rounded-none flex justify-center items-center"
                            testId="copy-button"
                            onClick={handleCopyUrl}
                        >
                            <FaRegCopy className="text-2xl sm:text-[1.5rem]" />
                        </Button>
                    </div>
                </div>
                <Button
                    className="mt-10 text-white p-3 rounded-full shadow-lg cursor-pointer hover:underline text-[20px]"
                    testId="create-new-button"
                    onClick={handleCreateNew}
                >
                    Create New
                </Button>
            </section>
        </>
    );
};

export default OutputSection;
