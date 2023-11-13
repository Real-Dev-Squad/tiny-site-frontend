import { fireEvent, render, screen } from '@testing-library/react';

import OutputSection from '@/components/App/OutputSection';

describe('OutputSection component', () => {
    const shortUrl = 'https://rds.li/123456';
    const originalUrl = 'https://status.realdevsquad.com/task/details/josuets45sds';

    it('renders OutputSection component correctly', () => {
        const mockHandleCopyUrl = jest.fn();
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                handleCopyUrl={mockHandleCopyUrl}
                handleCreateNew={mockHandleCopyUrl}
            />
        );

        expect(screen.getByTestId('copy-button')).toBeInTheDocument();
        expect(screen.getByTestId('share-button')).toBeInTheDocument();
    });

    it('calls handleCopyUrl function on button click', () => {
        const mockHandleCopyUrl = jest.fn();
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                handleCopyUrl={mockHandleCopyUrl}
                handleCreateNew={mockHandleCopyUrl}
            />
        );

        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        expect(mockHandleCopyUrl).toHaveBeenCalled();
    });

    it('opens a new tab when share button is clicked', () => {
        const mockHandleCopyUrl = jest.fn();
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                handleCopyUrl={mockHandleCopyUrl}
                handleCreateNew={mockHandleCopyUrl}
            />
        );

        const shareButton = screen.getByTestId('share-button');
        fireEvent.click(shareButton);
        expect(shareButton).toHaveAttribute('target', '_blank');
    });
});
