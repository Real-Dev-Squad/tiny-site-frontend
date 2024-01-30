import { fireEvent, render, screen } from '@testing-library/react';

import QRCodeModal from '@/components/QRCodeModal';

describe('QRCodeModal Component', () => {
    const onClose = jest.fn();

    test('renders the QRCodeModal component with close button', () => {
        render(
            <QRCodeModal
                onClose={() => {
                    onClose();
                }}
                value="https://www.rds.com"
            />
        );
        const closeButton = screen.getByTestId('close-qrcode-modal');
        expect(closeButton).toBeInTheDocument();
    });

    test('renders the QRCodeModal component with download button', () => {
        render(
            <QRCodeModal
                onClose={() => {
                    onClose();
                }}
                value="https://www.rds.com"
            />
        );
        const downloadButton = screen.getByTestId('download-qr-code');
        expect(downloadButton).toBeInTheDocument();
    });

    test('renders the QRCodeModal component with qrcode', () => {
        render(
            <QRCodeModal
                onClose={() => {
                    onClose();
                }}
                value="https://www.rds.com"
            />
        );
        const qrcodeCanvas = screen.getByTestId('qrcode');
        expect(qrcodeCanvas).toBeInTheDocument();
    });

    test('closes the modal when clicking outside the modal', () => {
        render(
            <QRCodeModal
                onClose={() => {
                    onClose();
                }}
                value="https://www.rds.com"
            />
        );
        const modal = screen.getByTestId('qrcode-modal');
        expect(modal).toBeInTheDocument();
        const body = document.querySelector('body');
        fireEvent.mouseDown(body as HTMLElement);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('download image by clicking download button', () => {
        render(
            <QRCodeModal
                onClose={() => {
                    onClose();
                }}
                value="https://www.rds.com"
            />
        );

        const downloadButton = screen.getByTestId('download-qr-code');
        expect(downloadButton).toBeInTheDocument();

        HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,abcd1234');
        document.body.appendChild = jest.fn();
        document.body.removeChild = jest.fn();

        fireEvent.click(downloadButton);

        expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledWith('image/png');
        expect(document.body.appendChild).toHaveBeenCalled();
        expect(document.body.removeChild).toHaveBeenCalled();
    });
});
