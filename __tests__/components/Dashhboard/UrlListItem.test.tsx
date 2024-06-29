import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import UrlListItem from '@/components/Dashboard/UrlListItem';
import useAuthenticated from '@/hooks/useAuthenticated';
import { deleteUrlApi } from '@/services/api';

import { urls } from '../../../__mocks__/db/urls';

jest.mock('@/hooks/useAuthenticated');
jest.mock('@/services/api');

describe('UrlListItem', () => {
    const queryClient = new QueryClient();
    const url = urls.urls[0];
    const copyButtonHandler = (url) => {
        navigator.clipboard.writeText(url);
    };
    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };

    beforeEach(() => {
        useAuthenticated.mockReturnValue({
            userData: { data: { id: 'user123' } },
        });
    });

    test('renders UrlListItem component', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem
                    url={url}
                    copyButtonHandler={() => {
                        copyButtonHandler(url.originalUrl);
                    }}
                />
            </QueryClientProvider>
        );
        const linkElement = screen.getByText(`${url.originalUrl}`);
        expect(linkElement).toBeInTheDocument();
    });

    test('copy button works', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem
                    url={url}
                    copyButtonHandler={() => {
                        copyButtonHandler(url.originalUrl);
                    }}
                />
            </QueryClientProvider>
        );
        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        expect(mockWriteText).toHaveBeenCalledWith(url.originalUrl);
    });

    test('delete button works', async () => {
        deleteUrlApi.mockResolvedValueOnce({});

        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem
                    url={url}
                    copyButtonHandler={() => {
                        copyButtonHandler(url.originalUrl);
                    }}
                />
            </QueryClientProvider>
        );
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteUrlApi).toHaveBeenCalledWith({ id: url.id, userId: 'user123' });
        });
    });

    test('shows error on delete failure', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => 'Alert called');
        deleteUrlApi.mockRejectedValueOnce(new Error('Error deleting URL'));

        render(
            <QueryClientProvider client={queryClient}>
                <UrlListItem
                    url={url}
                    copyButtonHandler={() => {
                        copyButtonHandler(url.originalUrl);
                    }}
                />
            </QueryClientProvider>
        );
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Error deleting URL');
        });

        alertMock.mockRestore();
    });
});
