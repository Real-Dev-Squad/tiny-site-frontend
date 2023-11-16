import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoaderTimer from '@/components/Redirect/LoaderTimer';

describe('LoaderTimer component', () => {
    test('renders redirecting message when timer is less than 1', () => {
        const timer = 0;
        render(
            <LoaderTimer
                timer={timer}
                goButtonClickHandler={() => {
                    jest.fn();
                }}
            />
        );

        expect(screen.getByText(/Redirecting.../i)).toBeInTheDocument();
    });

    test('renders loader and Go button when timer is greater than or equal to 1', () => {
        const timer = 2;
        const goButtonClickHandler = jest.fn();
        render(<LoaderTimer timer={timer} goButtonClickHandler={goButtonClickHandler} />);

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        expect(screen.getByText(/Go/i)).toBeInTheDocument();
    });

    test('calls goButtonClickHandler when Go button is clicked', async () => {
        const timer = 2;
        const goButtonClickHandler = jest.fn();
        render(<LoaderTimer timer={timer} goButtonClickHandler={goButtonClickHandler} />);

        fireEvent.click(screen.getByText(/Go/i));

        await waitFor(() => {
            jest.fn();
        });

        expect(goButtonClickHandler).toHaveBeenCalled();
    });
});
