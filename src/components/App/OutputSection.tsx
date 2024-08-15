import Link from 'next/link';
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaCheck, FaRegCopy } from 'react-icons/fa';
import { FaDiscord, FaLinkedin, FaSquareWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { HiOutlineDownload } from 'react-icons/hi';
import { PiShareFatBold } from 'react-icons/pi';

import Button from '@/components/Button';
import {
    discordShareUrl,
    linkedinShareUrl,
    removeProtocol,
    twitterShareUrl,
    whatsappShareUrl,
} from '@/constants/constants';

import OutputSectionShimmer from '../ShimmerEffect/OutputSectionShimmer';

const RDSIcon = '_next/image?url=%2Frds.png&w=64&q=75';

interface OutputSectionProps {
    originalUrl: string;
    shortUrl: string;
    isLoaded: boolean;
    handleCreateNew: () => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({ shortUrl, isLoaded }) => {
    const [downloaded, setDownloaded] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!isLoaded) {
        return <OutputSectionShimmer data-testid="output-section-shimmer" />;
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
            setDownloaded(true);
        }
    };

    const handleCopyUrl = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl);
            setCopied(true);
        }
    };

    return (
        <>
            <section
                className="flex flex-col items-center rounded-lg w-[80%] relative gap-8"
                data-testid="output-section"
            >
                <h1 className="text-lg md:text-xl xl:text-xl text-center font-semibold" data-testid="output-heading">
                    Your shortened URL is ready!
                </h1>
                <QRCode
                    data-testid="qrcode"
                    id="qr-code"
                    value={shortUrl}
                    size={150}
                    imageSettings={{
                        src: RDSIcon,
                        height: 35,
                        width: 35,
                        excavate: true,
                    }}
                    renderAs="canvas"
                    level="M"
                />
                <Button
                    className="bg-custom-blue flex items-center gap-1 p-[6px] sm:p-[10px] rounded-lg text-white xl:w-40 md:w-40 justify-center"
                    onClick={handleDownload}
                    data-testid="download-button"
                >
                    <span className="transition-transform duration-500 ease-in-out transform">
                        {downloaded ? <FaCheck /> : <HiOutlineDownload />}
                    </span>
                    {downloaded ? 'Downloaded' : 'Download'}
                </Button>
                <div
                    className="flex justify-between items-center rounded-lg p-2 border-2 border-gray-500 h-11 w-10/12"
                    data-testid="url-container"
                >
                    <span className="w-[70%] ellipsis overflow-hidden whitespace-nowrap text-sm xl:text-base font-semibold">
                        {shortUrl.replace(removeProtocol, '')}
                    </span>

                    <div className="flex w-[30%] justify-end items-center space-x-2 rounded-lg">
                        <Link
                            type="button"
                            className="p-[4px] sm:p-[10px] flex justify-center items-center"
                            href={shortUrl}
                            target="_blank"
                            data-testid="share-button"
                            rel="noopener noreferrer"
                        >
                            <PiShareFatBold className="text-xl sm:text-[1.5rem]" />
                        </Link>

                        <Button
                            type="button"
                            className="p-[4px] sm:p-[10px] flex justify-center items-center"
                            testId="copy-button"
                            onClick={handleCopyUrl}
                        >
                            <span className="transition-transform duration-700 ease-in-out transform">
                                {copied ? (
                                    <FaCheck className="text-xl sm:text-[1.5rem]" />
                                ) : (
                                    <FaRegCopy className="text-xl sm:text-[1.5rem]" />
                                )}
                            </span>
                        </Button>
                    </div>
                </div>

                <p className="text-slate-500 text-base" data-testid="share-text">
                    Or share via
                </p>
                <div className="flex space-x-4 justify-between w-full" data-testid="social-links">
                    <a
                        href={twitterShareUrl(shortUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-custom-blue"
                        data-testid="twitter-share"
                    >
                        <FaXTwitter className="text-5xl" />
                    </a>
                    <a
                        href={discordShareUrl(shortUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-custom-blue"
                        data-testid="discord-share"
                    >
                        <FaDiscord className="text-5xl" />
                    </a>
                    <a
                        href={linkedinShareUrl(shortUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-custom-blue"
                        data-testid="linkedin-share"
                    >
                        <FaLinkedin className="text-5xl" />
                    </a>
                    <a
                        href={whatsappShareUrl(shortUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-custom-blue"
                        data-testid="whatsapp-share"
                    >
                        <FaSquareWhatsapp className="text-5xl" />
                    </a>
                </div>
            </section>
        </>
    );
};

export default OutputSection;
