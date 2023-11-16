import { fireEvent, render, screen } from '@testing-library/react';

import OutputSection from '@/components/App/OutputSection';

describe('OutputSection component', () => {
    const shortUrl = 'https://rds.li/123456';
    const originalUrl = 'https://status.realdevsquad.com/task/details/josuets45sds';

    const mockHandleCopyUrl = jest.fn();
    const mockHandleCreateNew = jest.fn();
    it('renders OutputSection component correctly', () => {
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                handleCopyUrl={mockHandleCopyUrl}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        expect(screen.getByTestId('copy-button')).toBeInTheDocument();
        expect(screen.getByTestId('share-button')).toBeInTheDocument();
    });

    it('calls handleCopyUrl function on button click', () => {
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

    it('renders create new button when window width is less than 768px', () => {
        render(
            <OutputSection
                shortUrl={shortUrl}
                originalUrl={originalUrl}
                handleCopyUrl={mockHandleCopyUrl}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
        fireEvent(window, new Event('resize'));

        const createNewButton = screen.getByText('Create New');
        expect(createNewButton).toBeInTheDocument();
    });
    it('renders "Create New" button and calls the onClick handler when clicked', () => {
        render(
            <OutputSection
                originalUrl={originalUrl}
                shortUrl={shortUrl}
                handleCopyUrl={mockHandleCopyUrl}
                handleCreateNew={mockHandleCreateNew}
            />
        );

        const createNewButton = screen.getByText('Create New');
        expect(createNewButton).toBeInTheDocument();
        fireEvent.click(createNewButton);
        expect(mockHandleCreateNew).toHaveBeenCalled();
    });
});
