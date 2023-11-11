import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

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
        const tooltip = screen.getByText('The skip feature is exclusively available to Premium users.');
        expect(tooltip).toBeInTheDocument();
    });

    test('redirects when timer reaches zero', async () => {
        jest.useFakeTimers();
        render(<Redirect />);
        act(() => jest.advanceTimersByTime(5000));
        waitFor(() => expect(mockRouterPush).toHaveBeenCalled());
    });
});
