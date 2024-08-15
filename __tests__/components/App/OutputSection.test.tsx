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
});
