import Dashboard from '../../src/pages/dashboard';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('Dashboard Component', () => {
    const mockWriteText = jest.fn();
    global.navigator.clipboard = { writeText: mockWriteText };

    test('renders the Dashboard component', () => {
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        const generateButton = screen.getByText('Generate');

        expect(urlInput).toBeInTheDocument();
        expect(generateButton).toBeInTheDocument();
    });

    test('should have one input box and one button', () => {
        render(<Dashboard />);

        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        expect(urlInput).toBeInTheDocument();

        const generateButton = screen.getByText('Generate');
        expect(generateButton).toBeInTheDocument();
    });

    it('should get the value from the input box', () => {
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });
        expect(urlInput.value).toBe('https://www.google.com');
    });

    test.skip('should copy the short URL when clicking the Copy button', async () => {
        render(<Dashboard />);
        const urlInput = screen.getByPlaceholderText('🔗 Enter the URL');
        fireEvent.change(urlInput, { target: { value: 'https://www.google.com' } });
        expect(urlInput.value).toBe('https://www.google.com');

        const generateButton = screen.getByText('Generate');
        fireEvent.click(generateButton);

        await act(async () => {
            const copyButton = screen.getByTestId('copy-button');
            fireEvent.click(copyButton);
        });

        expect(mockWriteText).toHaveBeenCalled();
    });

    test.skip('should show toast message when clicking the Copy button', async () => {
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

    test.skip('should not show toast message after 3 seconds', () => {
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
