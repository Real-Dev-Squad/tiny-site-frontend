import Dashboard from '../../src/pages/dashboard';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Dashboard Component', () => {
    test('renders the Dashboard component', () => {
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        const generateButton = screen.getByText('Generate');
        const copyButton = screen.getByTestId('copy-button');

        expect(urlInput).toBeInTheDocument();
        expect(generateButton).toBeInTheDocument();
        expect(copyButton).toBeInTheDocument();
    });

    test('generates a short URL when clicking the Generate button', () => {
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        const shortUrlInput = screen.getByPlaceholderText('Copy the URL');

        fireEvent.click(generateButton);
        const shortUrlValue = shortUrlInput.value;

        expect(shortUrlValue).toMatch(/^https:\/\/rds\.li\/[a-zA-Z0-9]+$/);
    });
});
