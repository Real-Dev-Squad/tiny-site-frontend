import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Dashboard from '../../src/pages/dashboard';
import React from 'react';
import fetchMock from 'jest-fetch-mock';

describe('Dashboard', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };

    it('renders without crashing', () => {
        render(<Dashboard />);
        expect(screen.getByText('URL Shortener')).toBeInTheDocument();
    });

    it('displays a message when no URLs are found', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ urls: [] }));
        render(<Dashboard />);
        await waitFor(() => {
            expect(screen.getByText('No URLs found')).toBeInTheDocument();
        });
    });

    it('navigates to create page when "Create one" link is clicked', async () => {
        render(<Dashboard />);
        const createLink = screen.getByText('Create one');
        fireEvent.click(createLink);

        await waitFor(() => {
            expect(screen.getByText('URL Shortener')).toBeInTheDocument();
        });
    });
});
