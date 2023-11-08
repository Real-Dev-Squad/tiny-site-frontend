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

    test('should have two inputs and two buttons', () => {
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

    test('should copy the short URL when clicking the Copy button', async () => {
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);

        await act(async () => {
            const copyButton = screen.getByTestId('copy-button');
            fireEvent.click(copyButton);
        });

        expect(mockWriteText).toHaveBeenCalled();
    });

    test('should show toast message when clicking the Copy button', async () => {
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);

        await act(async () => {
            const copyButton = screen.getByTestId('copy-button');
            fireEvent.click(copyButton);
        });

        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();
    });

    test('should not show toast message when not clicking the Copy button', () => {
        render(<Dashboard />);
        const toast = screen.queryByTestId('toast');
        expect(toast).not.toBeInTheDocument();
    });

    test('should not show toast message after 3 seconds', () => {
        jest.useFakeTimers();
        render(<Dashboard />);
        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);

        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);

        const toast = screen.getByTestId('toast');
        expect(toast).toBeInTheDocument();

        jest.advanceTimersByTime(3000);

        const updatedToast = screen.queryByTestId('toast');
        expect(updatedToast).toBeInTheDocument();
    });
});
