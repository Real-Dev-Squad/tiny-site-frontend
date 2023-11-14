import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import Redirect from '../../src/pages/[redirect]/index';

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

    test('renders loader timer with go button', () => {
        render(<Redirect />);
        const timer = screen.getByText('5');
        const goButton = screen.getByText('Go');
        expect(timer).toBeInTheDocument();
        expect(goButton).toBeInTheDocument();
    });

    test.skip('redirects to original URL on Go button click', async () => {
        render(<Redirect />);
        const goButton = screen.getByText('Go');
        await act(async () => {
            fireEvent.click(goButton);
        });
        expect(mockRouterPush).toHaveBeenCalled();
    });

    test.skip('redirects when timer reaches zero', async () => {
        jest.useFakeTimers();
        render(<Redirect />);

        act(() => jest.advanceTimersByTime(5000));

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalled();
        });
    });
});
