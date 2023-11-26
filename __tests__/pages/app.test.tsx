import { act, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from '../../src/pages/app';

describe('App Component', () => {
    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };

    const queryClient = new QueryClient();

    test('renders the App component with input box and button', () => {
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
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });
        expect(urlInput.value).toBe('https://www.google.com');
    });

    test.skip('generates and displays short URL on button click', async () => {
        jest.mock('../../src/hooks/useAuthenticated', () => ({
            useuseAuthenticated: () => ({
                isLoggedIn: true,
                userData: { username: 'testUser', Id: 1 },
            }),
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });

        const generateButton = screen.getByText('Generate');

        await act(async () => {
            fireEvent.click(generateButton);

            await new Promise((resolve) => setTimeout(resolve, 500));

            const shortUrlInput = screen.queryByPlaceholderText('Copy the URL');
            expect(shortUrlInput).toBeTruthy();
        });

        const toast = screen.queryByTestId('toast');
        expect(toast).toBeNull();
    });

    test.skip('copies short URL to clipboard on Copy button click', async () => {
        jest.mock('../../src/hooks/useAuthenticated', () => ({
            useuseAuthenticated: () => ({
                isLoggedIn: false,
                userData: null,
            }),
        }));
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });

        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);

        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);

        expect(mockWriteText).toHaveBeenCalledWith(expect.any(String));
    });

    test.skip('shows toast message when Copy button is clicked', async () => {
        jest.mock('../../src/hooks/useAuthenticated', () => ({
            useuseAuthenticated: () => ({
                isLoggedIn: true,
                userData: null,
            }),
        }));
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const generateButton = screen.getByText('Shorten');
        fireEvent.click(generateButton);
        await screen.findByTestId('toast');
        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
    });

    test('does not show toast message when Copy button is not clicked', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        const toast = screen.queryByTestId('toast');
        expect(toast).not.toBeInTheDocument();
    });
});
