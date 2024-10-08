import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
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

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
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
    const mockUseRouter = useRouter as jest.Mock;

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
        mockUseRouter.mockReturnValue({});
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
        const push = jest.fn();
        mockUseRouter.mockReturnValue({ push });
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
        expect(screen.getByTestId('modal')).toBeInTheDocument();
        expect(screen.getByText('Login to view your URLs and create new ones')).toBeInTheDocument();
        const closeButton = screen.getByTestId('close-modal');
        closeButton.click();
        expect(push).toHaveBeenCalledWith('/');
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
        // eslint-disable-next-line quotes
        expect(screen.getByText("Oops! We couldn't find any URLs.")).toBeInTheDocument();
        expect(screen.getByText('Create a URL')).toBeInTheDocument();
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
