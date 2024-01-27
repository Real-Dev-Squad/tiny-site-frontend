import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetUrlsQuery } from '@/services/api';

import { urls } from '../../__mocks__/db/urls';
import userData from '../../__mocks__/db/user';
import Dashboard from '../../src/pages/dashboard';

jest.mock('../../src/services/api', () => ({
    useGetUrlsQuery: jest.fn(),
}));

jest.mock('../../src/hooks/useAuthenticated', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Dashboard', () => {
    const queryClient = new QueryClient();
    const mockUseAuthenticated = useAuthenticated as jest.Mock;
    const mockUseGetUrlsQuery = useGetUrlsQuery as jest.Mock;
    const mockCopyToClipboard = jest.fn();

    beforeAll(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: mockCopyToClipboard,
            },
        });
    });

    it('renders dashboard page', () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: true,
            userData: userData.data,
        });
        mockUseGetUrlsQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
        });
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        expect(screen.getByTestId('dashboard-shimmer')).toBeInTheDocument();
    });

    it('renders dashboard page with urls', () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: true,
            userData: userData.data,
        });
        mockUseGetUrlsQuery.mockReturnValue({
            data: urls,
            isLoading: false,
        });
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        expect(screen.getByText(urls.urls[0].originalUrl)).toBeInTheDocument();
    });

    it('shows login modal if not logged in', () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: false,
            userData: undefined,
        });
        mockUseGetUrlsQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
        });
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        expect(screen.getByTestId('login-modal')).toBeInTheDocument();
        expect(screen.getByText('Login to view your URLs and create new ones')).toBeInTheDocument();
        const closeButton = screen.getByTestId('close-login-modal');
        closeButton.click();
    });

    it('shows no urls found message if no urls found', () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: true,
            userData: userData.data,
        });
        mockUseGetUrlsQuery.mockReturnValue({
            data: { urls: [] },
            isLoading: false,
            isError: false,
        });
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        expect(screen.getByText('No URLs found')).toBeInTheDocument();
        expect(screen.getByText('Create one')).toBeInTheDocument();
    });

    it('shows toast message when copy button is clicked', () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: true,
            userData: userData.data,
        });
        mockUseGetUrlsQuery.mockReturnValue({
            data: urls,
            isLoading: false,
        });
        render(
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        );
        const copyButton = screen.getAllByTestId('copy-button');
        copyButton[0].click();
        expect(mockCopyToClipboard).toHaveBeenCalledTimes(1);
    });
});
