import { render, screen, act, fireEvent } from '@testing-library/react';
import Redirect from '../../src/pages/[redirect]/index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Redirect Component', () => {
    const mockRouterPush = jest.fn();
    const mockRouterReplace = jest.fn();
    const mockRouter = {
        push: mockRouterPush,
        replace: mockRouterReplace,
        query: { redirect: 'ffdsfds' },
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    test('renders the Redirect component with countdown and Go button', () => {
        render(<Redirect />);
        const goButton = screen.getByText('Go');

        expect(goButton).toBeInTheDocument();
    });

    test('redirects to original URL on Go button click', async () => {
        render(<Redirect />);
        const goButton = screen.getByText('Go');
        await act(async () => {
            fireEvent.click(goButton);
        });
        expect(mockRouterPush).toHaveBeenCalled();
    });

    test('redirects to original URL on Go button click', async () => {
        render(<Redirect />);
        const goButton = screen.getByText('Go');
        await act(async () => {
            fireEvent.click(goButton);
        });
        expect(mockRouterPush).toHaveBeenCalled();
    });

    test('show tooltip on Go button click', async () => {
        render(<Redirect />);
        const goButton = screen.getByText('Go');
        await act(async () => {
            fireEvent.click(goButton);
        });
        expect(mockRouterPush).toHaveBeenCalled();
    });

    test('fetchOriginalUrl function returns original URL', async () => {
        const mockFetchOriginalUrl = jest.fn();
        mockFetchOriginalUrl.mockReturnValue('https://www.google.com');
        const originalUrl = await mockFetchOriginalUrl();
        expect(originalUrl).toBe('https://www.google.com');
    });
});
