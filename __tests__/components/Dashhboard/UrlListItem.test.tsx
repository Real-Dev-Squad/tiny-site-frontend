import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import UrlListItem, { CopyButton, DeleteButton } from '@/components/Dashboard/UrlListItem';
import useAuthenticated from '@/hooks/useAuthenticated';
import { deleteUrlApi } from '@/services/api';

import { urls } from '../../../__mocks__/db/urls';

jest.mock('@/hooks/useAuthenticated', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('@/services/api', () => ({
    deleteUrlApi: jest.fn(),
}));

describe('UrlListItem', () => {
    const queryClient = new QueryClient();
    const url = urls.urls[0];
    const copyButtonHandler = (url: string) => {
        navigator.clipboard.writeText(url);
    };

    const mockWriteText = jest.fn();
    beforeAll(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: mockWriteText,
            },
        });
    });

    beforeEach(() => {
        (useAuthenticated as jest.Mock).mockReturnValue({
            userData: { data: { id: 123 } },
        });
    });

    test('renders UrlListItem component', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem url={url} copyButtonHandler={copyButtonHandler} />
            </QueryClientProvider>
        );
        const originalUrlElement = screen.getByText(url.originalUrl);
        expect(originalUrlElement).toBeInTheDocument();
    });

    test('copy button works', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem url={url} copyButtonHandler={copyButtonHandler} />
            </QueryClientProvider>
        );
        const copyButton = screen.getAllByTestId('copy-button')[0];
        fireEvent.click(copyButton);
        expect(mockWriteText).toHaveBeenCalledWith(`https://staging-tiny.realdevsquad.com/${url.shortUrl}`);
    });

    test('delete button works', async () => {
        (deleteUrlApi as jest.Mock).mockResolvedValueOnce({});

        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem url={url} copyButtonHandler={copyButtonHandler} />
            </QueryClientProvider>
        );
        const deleteButtons = screen.getAllByTestId('delete-button');
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(deleteUrlApi).toHaveBeenCalledWith({ id: url.id });
        });
    });

    test('shows error on delete failure', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => 'Alert called');
        (deleteUrlApi as jest.Mock).mockRejectedValueOnce(new Error('Error deleting URL'));

        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem url={url} copyButtonHandler={copyButtonHandler} />
            </QueryClientProvider>
        );
        const deleteButtons = screen.getAllByTestId('delete-button');
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Error deleting URL');
        });

        alertMock.mockRestore();
    });
});

describe('DeleteButton', () => {
    const onDelete = jest.fn();

    it('renders correctly', () => {
        render(<DeleteButton isLoading={false} onDelete={onDelete} />);
        const deleteButton = screen.getByTestId('delete-button');
        expect(deleteButton).toBeInTheDocument();
    });

    it('triggers onDelete when clicked', () => {
        render(<DeleteButton isLoading={false} onDelete={onDelete} />);
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);
        expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('displays loader when isLoading is true', () => {
        render(<DeleteButton isLoading={true} onDelete={onDelete} />);
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });

    it('disables button when isLoading is true', () => {
        render(<DeleteButton isLoading={true} onDelete={onDelete} />);
        const deleteButton = screen.getByTestId('delete-button');
        expect(deleteButton).toBeDisabled();
    });
});

describe('CopyButton', () => {
    const onCopy = jest.fn();

    it('renders correctly', () => {
        render(<CopyButton onCopy={onCopy} />);
        const copyButton = screen.getByTestId('copy-button');
        expect(copyButton).toBeInTheDocument();
    });

    it('triggers onCopy when clicked', () => {
        render(<CopyButton onCopy={onCopy} />);
        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        expect(onCopy).toHaveBeenCalledTimes(1);
    });
});
