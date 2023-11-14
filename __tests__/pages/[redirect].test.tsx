import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import Redirect from '../../src/pages/[redirect]/index';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe.skip('Redirect Component', () => {
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

    // render the component and test the UI
    test('renders loader timer with go button', () => {
        render(<Redirect />);
        const timer = screen.getByText('5');
        const goButton = screen.getByText('Go');
        expect(timer).toBeInTheDocument();
        expect(goButton).toBeInTheDocument();
    });

    test('redirects to original URL on Go button click', async () => {
        render(<Redirect />);
        const goButton = screen.getByText('Go');
        await act(async () => {
            fireEvent.click(goButton);
        });
        // Ensure the router.push has been called
        expect(mockRouterPush).toHaveBeenCalled();
    });

    test('show tooltip on Go button click', async () => {
        render(<Redirect />);
        const goButton = screen.getByText('Go');
        await act(async () => {
            fireEvent.click(goButton);
        });
        // Ensure the router.push has been called
        expect(mockRouterPush).toHaveBeenCalled();

        // Use waitFor to wait for the tooltip to appear
        await waitFor(() => {
            const tooltip = screen.getByText('The skip feature is exclusively available to Premium users.');
            expect(tooltip).toBeInTheDocument();
        });
    });

    test('redirects when timer reaches zero', async () => {
        jest.useFakeTimers();
        render(<Redirect />);

        // Use act to ensure the fake timers are properly advanced
        act(() => jest.advanceTimersByTime(5000));

        // Use waitFor to wait for the router.push to be called
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalled();
        });
    });
});
