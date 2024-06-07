import QRCode from 'qrcode.react';
import React, { useEffect, useRef } from 'react';
import { FcDownload } from 'react-icons/fc';
import { IoCloseSharp } from 'react-icons/io5';

import Button from '@/components/Button';
const RDSIcon = '_next/image?url=%2Frds.png&w=64&q=75';

interface QRCodeModalProps {
    shortUrl: string;
    onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ shortUrl, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const downloadQRCode = () => {
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
        <dialog
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent backdrop-blur-sm z-50"
            data-testid="qrcode-modal"
        >
            <div
                ref={modalRef}
                className="bg-gray-800 p-8 rounded-md w-[330px] relative flex flex-col justify-center items-center shadow-lg"
            >
                <Button className="absolute top-2 right-2 text-white" testId="close-qrcode-modal" onClick={onClose}>
                    <IoCloseSharp style={{ fontSize: '1.5em' }} />
                </Button>
                <QRCode
                    data-testid="qrcode"
                    id="qr-code"
                    value={`URL: ${shortUrl}`}
                    size={256}
                    includeMargin={true}
                    imageSettings={{
                        src: RDSIcon,
                        height: 50,
                        width: 50,
                        excavate: false,
                    }}
                    renderAs="canvas"
                    level="L"
                />
                <Button
                    className="px-4 py-2 bg-white rounded-md mt-4 hover:bg-gray-100 text-gray-800"
                    testId="download-qr-code"
                    onClick={downloadQRCode}
                >
                    <FcDownload className="inline-block mr-2" />
                    Download
                </Button>
            </div>
        </dialog>
    );
};

export default QRCodeModal;
