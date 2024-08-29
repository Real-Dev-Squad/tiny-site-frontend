import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import useAuthenticated from '@/hooks/useAuthenticated';
import App from '@/pages/app';

import { userData } from '../../fixtures/users';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../../src/hooks/useAuthenticated', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('App Component', () => {
    const mockWriteText = jest.fn();
    const mockUseAuthenticated = useAuthenticated as jest.Mock;
    const mockUseRouter = useRouter as jest.Mock;
    global.navigator.clipboard = { writeText: mockWriteText };

    const queryClient = new QueryClient();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the App component with input box and button', () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: true,
            userData: userData.data,
        });
        mockUseRouter.mockReturnValue({});
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        const generateButton = screen.getByText('Shorten');

        expect(urlInput).toBeInTheDocument();
        expect(generateButton).toBeInTheDocument();
    });

    test('updates input box value when text is entered', () => {
        mockUseRouter.mockReturnValue({});

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });
        expect(urlInput.value).toBe('https://www.google.com');
    });

    test('shows error toast when invalid URL is entered', async () => {
        mockUseRouter.mockReturnValue({});
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        const generateButton = screen.getByText('Shorten');
        fireEvent.change(urlInput, { target: { value: 'invalid url' } });
        fireEvent.click(generateButton);
        const errorToasts = await screen.findAllByText('Enter a valid URL');
        expect(errorToasts.length).toBeTruthy();
    });

    test('shows login modal when user is not logged in', async () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: false,
            userData: undefined,
        });
        mockUseRouter.mockReturnValue({});
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        const generateButton = screen.getByText('Shorten');
        fireEvent.change(urlInput, { target: { value: 'https://www.longurl.com' } });
        fireEvent.click(generateButton);
        const loginModal = await screen.findByText('Log in to generate short links');
        expect(loginModal).toBeInTheDocument();
    });

    test('shows output section when user is logged in', async () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: true,
            userData: userData.data,
        });
        mockUseRouter.mockReturnValue({});

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        const generateButton = screen.getByText('Shorten');
        fireEvent.change(urlInput, { target: { value: 'https://www.longurl.com' } });
        fireEvent.click(generateButton);
        const outputSection = await screen.findByTestId('output-section');
        expect(outputSection).toBeInTheDocument();
    });

    test('closes login modal when user clicks on close button', async () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: false,
            userData: undefined,
        });
        mockUseRouter.mockReturnValue({});

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        const generateButton = screen.getByText('Shorten');
        fireEvent.change(urlInput, { target: { value: 'https://www.longurl.com' } });
        fireEvent.click(generateButton);
        const closeButton = await screen.findByTestId('close-modal');
        fireEvent.click(closeButton);
        const loginModal = screen.queryByText('Log in to generate short links');
        expect(loginModal).not.toBeInTheDocument();
    });

    test('copies short url to clipboard when user clicks on copy button', async () => {
        mockUseAuthenticated.mockReturnValue({
            isLoggedIn: true,
            userData: userData.data,
        });
        mockUseRouter.mockReturnValue({});

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        const generateButton = screen.getByText('Shorten');
        fireEvent.change(urlInput, { target: { value: 'https://www.longurl.com' } });
        fireEvent.click(generateButton);
        const copyButton = await screen.findByTestId('copy-button');
        fireEvent.click(copyButton);
        await waitFor(() => expect(mockWriteText).toBeTruthy());
    });
});
