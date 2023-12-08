import { render, screen } from '@testing-library/react';

import ErrorPage from '@/components/Redirect/ErrorPage';

describe('ErrorPage', () => {
    it('should render correctly', () => {
        render(<ErrorPage />);
        expect(screen.getByText('Oops!')).toBeInTheDocument();
        expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
        expect(screen.getByText('Reload')).toBeInTheDocument();
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
