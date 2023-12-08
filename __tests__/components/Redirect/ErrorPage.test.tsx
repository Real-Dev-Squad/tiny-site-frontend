import { render, screen } from '@testing-library/react';

import ErrorPage from '@/components/Redirect/ErrorPage';

describe('ErrorPage', () => {
    it('should render correctly', () => {
        render(<ErrorPage />);
        const errorText = screen.getByText('Oops!');
        const errorDescription = screen.getByText('Something went wrong. Please try again.');
        const reloadButton = screen.getByText('Reload');
        expect(errorText).toBeInTheDocument();
        expect(errorDescription).toBeInTheDocument();
        expect(reloadButton).toBeInTheDocument();
    });

    it('should reload the page when reload button is clicked', () => {
        const reloadMock = jest.fn();
        Object.defineProperty(window, 'location', {
            value: {
                reload: reloadMock,
            },
            writable: true,
        });
        render(<ErrorPage />);
        screen.getByText('Reload').click();
        expect(reloadMock).toHaveBeenCalledTimes(1);
    });
});
