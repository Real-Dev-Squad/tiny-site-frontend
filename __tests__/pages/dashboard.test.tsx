import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Dashboard from '../../src/pages/dashboard';

describe('Dashboard', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };
    const queryClient = new QueryClient();

    it('renders without crashing', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        expect(screen.getByText('URL Shortener')).toBeInTheDocument();
    });

    it.skip('displays a message when no URLs are found', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ urls: [] }));
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(screen.getByText('No URLs found')).toBeInTheDocument();
        });
    });

    it.skip('navigates to create page when "Create one" link is clicked', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        const createLink = screen.getByText('Create New');
        fireEvent.click(createLink);

        await waitFor(() => {
            expect(screen.getByText('Enter a URL to shorten')).toBeInTheDocument();
        });
    });
});
