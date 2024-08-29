import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';

import OutputSection from '@/components/App/OutputSection';

describe('OutputSection component', () => {
    const shortUrl = 'https://rds.li/123456';
    const originalUrl = 'https://status.realdevsquad.com/task/details/josuets45sds';

    const mockHandleCreateNew = jest.fn();

    beforeAll(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(() => Promise.resolve()),
            },
        });
    });

    beforeEach(() => {
        HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
            fillRect: jest.fn(),
            clearRect: jest.fn(),
            getImageData: jest.fn(),
            putImageData: jest.fn(),
            createImageData: jest.fn(),
            setTransform: jest.fn(),
            drawImage: jest.fn(),
            save: jest.fn(),
            fillText: jest.fn(),
            restore: jest.fn(),
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            closePath: jest.fn(),
            stroke: jest.fn(),
            translate: jest.fn(),
            scale: jest.fn(),
            rotate: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            measureText: jest.fn().mockReturnValue({ width: 0 }),
            transform: jest.fn(),
            rect: jest.fn(),
            clip: jest.fn(),
            isPointInPath: jest.fn(),
            isPointInStroke: jest.fn(),
            canvas: document.createElement('canvas'),
        });

        HTMLCanvasElement.prototype.toDataURL = jest.fn().mockReturnValue('data:image/png;base64,mocked');

        jest.clearAllMocks();
    });

    it('renders OutputSection component correctly', () => {
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        expect(screen.getByTestId('copy-button')).toBeInTheDocument();
        expect(screen.getByTestId('share-button')).toBeInTheDocument();
        expect(screen.getByTestId('output-heading')).toHaveTextContent('Your shortened URL is ready!');
    });

    it('calls handleCopyUrl function on button click', () => {
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(shortUrl);
    });

    it('opens a new tab when share button is clicked', () => {
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        const shareButton = screen.getByTestId('share-button');
        fireEvent.click(shareButton);
        expect(shareButton).toHaveAttribute('target', '_blank');
    });

    it('renders social media share links', () => {
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        expect(screen.getByTestId('twitter-share')).toBeInTheDocument();
        expect(screen.getByTestId('discord-share')).toBeInTheDocument();
        expect(screen.getByTestId('linkedin-share')).toBeInTheDocument();
        expect(screen.getByTestId('whatsapp-share')).toBeInTheDocument();
    });

    it('renders shimmer when isLoaded is false', () => {
        render(
            <OutputSection
                originalUrl={originalUrl}
                shortUrl={shortUrl}
                isLoaded={false}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        const shimmer = screen.getByTestId('output-section-shimmer');
        expect(shimmer).toBeInTheDocument();
    });

    it('updates the button text on download click', async () => {
        render(
            <OutputSection
                shortUrl="https://example.com/short-url"
                originalUrl="https://example.com/original-url"
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );
        const downloadButton = screen.getByTestId('download-button');
        fireEvent.click(downloadButton);

        const updatedText = await screen.findByText('Downloaded');
        expect(updatedText).toBeInTheDocument();
    });

    it('triggers the download process correctly', () => {
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        const downloadButton = screen.getByTestId('download-button');
        fireEvent.click(downloadButton);
        expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalled();
    });

    it('does nothing when canvas is not found during download', () => {
        document.getElementById = jest.fn().mockReturnValue(null);

        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        const downloadButton = screen.getByTestId('download-button');
        fireEvent.click(downloadButton);

        expect(HTMLCanvasElement.prototype.toDataURL).not.toHaveBeenCalled();
    });

    it('does nothing when shortUrl is empty during copy', () => {
        render(
            <OutputSection
                shortUrl=""
                originalUrl={originalUrl}
                isLoaded={true}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);

        expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    });
});
