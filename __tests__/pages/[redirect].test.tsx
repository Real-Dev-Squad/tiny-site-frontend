import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useGetOriginalUrlQuery } from '@/services/api';

import { urlDetails } from '../../__mocks__/db/urls';
import Redirect from '../../src/pages/[redirect]/index';

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: jest.fn().mockImplementation(() => ({
        query: { redirect: '963d9c42' },
    })),
}));

jest.mock('../../src/services/api', () => ({
    useGetOriginalUrlQuery: jest.fn(),
}));

describe('Redirect Component', () => {
    const queryClient = new QueryClient();
    const mockUseGetOriginalUrlQuery = useGetOriginalUrlQuery as jest.Mock;

    test('renders loading state', async () => {
        mockUseGetOriginalUrlQuery.mockReturnValue({
            isLoading: true,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Redirect />
            </QueryClientProvider>
        );

        const redirectShimmer = screen.getByTestId('redirect-shimmer');
        expect(redirectShimmer).toBeInTheDocument();
    });

    test('renders not found message', async () => {
        mockUseGetOriginalUrlQuery.mockReturnValue({ isError: true });

        render(
            <QueryClientProvider client={queryClient}>
                <Redirect />
            </QueryClientProvider>
        );

        const error = screen.getByText('Something went wrong. Please try again.');
        expect(error).toBeInTheDocument();
    });

    test('renders redirect information and timer', async () => {
        mockUseGetOriginalUrlQuery.mockReturnValue({
            data: urlDetails,
            isLoading: false,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Redirect />
            </QueryClientProvider>
        );

        const redirectUrl = screen.getByText(urlDetails.url.originalUrl);
        expect(redirectUrl).toBeInTheDocument();
        const timer = screen.getByTestId('loader');
        expect(timer).toBeInTheDocument();
        const goButton = screen.getByText('Go');
        expect(goButton).toBeInTheDocument();
    });

    test('redirects when timer reaches 0', async () => {
        mockUseGetOriginalUrlQuery.mockReturnValue({
            data: urlDetails,
            isLoading: false,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Redirect />
            </QueryClientProvider>
        );

        expect(screen.getByTestId('loader')).toHaveTextContent('3');
        jest.advanceTimersByTime(3000);
        await waitFor(() => {
            const redirectUrl = screen.getByText(urlDetails.url.originalUrl);
            expect(redirectUrl).toBeInTheDocument();
        });
    });

    test('shows tooltip when user is not premium and clicks go button', async () => {
        mockUseGetOriginalUrlQuery.mockReturnValue({
            data: urlDetails,
            isLoading: false,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Redirect />
            </QueryClientProvider>
        );

        fireEvent.click(screen.getByText('Go'));
        await waitFor(() => {
            const tooltip = screen.getByText('The skip feature is exclusively available to Premium users.');
            expect(tooltip).toBeInTheDocument();
        });
    });
});
