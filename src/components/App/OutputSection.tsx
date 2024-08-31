import Link from 'next/link';
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaCheck, FaRegCopy } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa6';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { HiOutlineDownload } from 'react-icons/hi';

import Button from '@/components/Button';
import { linkedinShareUrl, removeProtocol, twitterShareUrl, whatsappShareUrl } from '@/constants/constants';

import OutputSectionShimmer from '../ShimmerEffect/OutputSectionShimmer';

interface OutputSectionProps {
    originalUrl: string;
    shortUrl: string;
    isLoaded: boolean;
    handleCreateNew: () => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({ shortUrl, isLoaded }) => {
    const [downloaded, setDownloaded] = useState(false);
    const [copied, setCopied] = useState(false);

    const CopyActionIcon = copied ? FaCheck : FaRegCopy;
    const DownloadActionIcon = downloaded ? FaCheck : HiOutlineDownload;
    const DownloadButtonText = downloaded ? 'Downloaded' : 'Download';

    if (!isLoaded) {
        return <OutputSectionShimmer data-testid="output-section-shimmer" />;
    }

    const handleDownload = () => {
        const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
        if (!canvas) return;

        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${shortUrl.split('/').pop()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setDownloaded(true);
    };

    const handleCopyUrl = () => {
        if (!shortUrl) return;

        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    };

    return (
        <section className="flex flex-col items-center rounded-lg w-[80%] relative gap-8" data-testid="output-section">
            <h1 className="text-lg md:text-xl xl:text-xl text-center font-semibold" data-testid="output-heading">
                Your shortened URL is ready!
            </h1>
            <QRCode
                data-testid="qrcode"
                id="qr-code"
                value={shortUrl}
                size={150}
                imageSettings={{
                    src: '/rds.png',
                    height: 40,
                    width: 40,
                    excavate: true,
                }}
                renderAs="canvas"
                level="M"
            />
            <Button
                className="bg-custom-blue flex items-center gap-1 p-[6px] sm:p-[10px] rounded-lg text-white xl:w-40 md:w-40 justify-center"
                onClick={handleDownload}
                testId="download-button"
            >
                <span className="transition-transform duration-500 ease-in-out transform">
                    <DownloadActionIcon />
                </span>
                {DownloadButtonText}
            </Button>
            <div
                className="flex justify-between items-center rounded-lg p-2 border-2 border-gray-500 h-11 w-10/12"
                data-testid="url-container"
            >
                <span className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-sm xl:text-base font-semibold">
                    {shortUrl.replace(removeProtocol, '')}
                </span>

                <div className="flex justify-end items-center rounded-lg">
                    <Button
                        type="button"
                        className="p-1 text-lg flex justify-center items-center"
                        testId="copy-button"
                        onClick={handleCopyUrl}
                    >
                        <span className="transition-transform duration-700 ease-in-out transform">
                            <CopyActionIcon />
                        </span>
                    </Button>
                </div>
            </div>

            <p className="text-slate-500 text-base" data-testid="share-text">
                Or share via
            </p>
            <div className="flex space-x-4 justify-around w-full" data-testid="social-links">
                <Link
                    href={twitterShareUrl(shortUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-blue"
                    data-testid="twitter-share"
                >
                    <FaXTwitter className="text-5xl" />
                </Link>
                <Link
                    href={linkedinShareUrl(shortUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-blue"
                    data-testid="linkedin-share"
                >
                    <FaLinkedin className="text-5xl" />
                </Link>
                <Link
                    href={whatsappShareUrl(shortUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-custom-blue"
                    data-testid="whatsapp-share"
                >
                    <FaWhatsapp className="text-5xl" />
                </Link>
            </div>
        </section>
    );
};

export default OutputSection;
