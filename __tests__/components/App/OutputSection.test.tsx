import { fireEvent, render, screen } from '@testing-library/react';

import OutputSection from '@/components/App/OutputSection';

describe('OutputSection component', () => {
    const shortUrl = 'https://rds.li/123456';

    it('renders OutputSection component correctly', () => {
        const mockHandleCopyUrl = jest.fn();
        render(<OutputSection shortUrl={shortUrl} handleCopyUrl={mockHandleCopyUrl} />);
        expect(screen.getByPlaceholderText('Copy the URL')).toBeInTheDocument();
        expect(screen.getByText('Copy')).toBeInTheDocument();
        expect(screen.getByTestId('copy-button')).toBeInTheDocument();
        expect(screen.getByTestId('share-button')).toBeInTheDocument();
    });

    it('calls handleCopyUrl function on button click', () => {
        const mockHandleCopyUrl = jest.fn();
        render(<OutputSection shortUrl={shortUrl} handleCopyUrl={mockHandleCopyUrl} />);
        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        expect(mockHandleCopyUrl).toHaveBeenCalled();
    });

    it('opens a new tab when share button is clicked', () => {
        const mockHandleCopyUrl = jest.fn();
        render(<OutputSection shortUrl={shortUrl} handleCopyUrl={mockHandleCopyUrl} />);
        const shareButton = screen.getByTestId('share-button');
        fireEvent.click(shareButton);
        expect(shareButton).toHaveAttribute('target', '_blank');
    });
});
