import Dashboard from '../../src/pages/dashboard';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('Dashboard Component', () => {
    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };

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

    it('should have two inputs and two buttons', () => {
        render(<Dashboard />);

        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        expect(urlInput).toBeInTheDocument();
        const shortUrlInput = screen.getByPlaceholderText('Copy the URL');
        expect(shortUrlInput).toBeInTheDocument();

        const generateButton = screen.getByText('Generate');
        expect(generateButton).toBeInTheDocument();

        const copyButton = screen.getByTestId('copy-button');
        expect(copyButton).toBeInTheDocument();
    });

    it('should get the value from the input box', () => {
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });
        expect(urlInput.value).toBe('https://www.google.com');
    });

    test('should generate the short url when clicking the generate button', () => {
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);
        const shortUrlInput = screen.getByPlaceholderText('Copy the URL');
        const shortUrlValue = shortUrlInput.value;
        expect(shortUrlValue).toMatch(/^https:\/\/rds\.li\/[a-zA-Z0-9]+$/);
    });

    it('should copy the short url when clicking the copy button', () => {
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);
        const shortUrlInput = screen.getByPlaceholderText('Copy the URL');
        const shortUrlValue = shortUrlInput.value;
        expect(shortUrlValue).toMatch(/^https:\/\/rds\.li\/[a-zA-Z0-9]+$/);
        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        expect(mockWriteText).toHaveBeenCalledWith(shortUrlValue);
    });

    test('should show toast message when clicking the copy button', () => {
        render(<Dashboard />);
        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
    });

    test('should not show toast message when not clicking the copy button', () => {
        render(<Dashboard />);
        const toast = screen.queryByTestId('toast');
        expect(toast).not.toBeInTheDocument();
    });

    test('should not show toast message after 3 seconds', async () => {
        jest.useFakeTimers();
        render(<Dashboard />);
        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
        await act(async () => {
            jest.advanceTimersByTime(3000);
        });
        render(<Dashboard />);
        expect(toast).not.toBeInTheDocument();
    });
});
