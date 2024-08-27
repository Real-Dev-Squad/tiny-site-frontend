import { fireEvent, render, screen } from '@testing-library/react';

import UrlForm from '@/components/App/UrlForm';

describe('UrlForm component', () => {
    const testUrl = 'https://stackoverflow.com/questions/26944762/when-to-use-chore-as-type-of-commit-message';

    it('renders UrlForm component correctly', () => {
        const mockSetUrl = jest.fn();
        const mockOnSubmit = jest.fn();
        const mockClearError = jest.fn();
        render(
            <UrlForm
                url={testUrl}
                setUrl={mockSetUrl}
                onSubmit={mockOnSubmit}
                error={null}
                clearError={mockClearError}
                loading={false}
            />
        );
        expect(screen.getByPlaceholderText('Enter the URL')).toBeInTheDocument();
        expect(screen.getByTestId('shorten-button')).toBeInTheDocument();
    });

    it('calls setUrl function on input change and clearError', () => {
        const mockSetUrl = jest.fn();
        const mockOnSubmit = jest.fn();
        const mockClearError = jest.fn();
        render(
            <UrlForm
                url={testUrl}
                setUrl={mockSetUrl}
                onSubmit={mockOnSubmit}
                error={null}
                clearError={mockClearError}
                loading={false}
            />
        );
        const inputElement = screen.getByPlaceholderText('Enter the URL');
        fireEvent.change(inputElement, { target: { value: 'https://realdevsquad.com' } });
        expect(mockSetUrl).toHaveBeenCalledWith('https://realdevsquad.com');
        expect(mockClearError).toHaveBeenCalled();
    });

    it('calls onSubmit function on button click', () => {
        const mockSetUrl = jest.fn();
        const mockOnSubmit = jest.fn();
        const mockClearError = jest.fn();
        render(
            <UrlForm
                url={testUrl}
                setUrl={mockSetUrl}
                onSubmit={mockOnSubmit}
                error={null}
                clearError={mockClearError}
                loading={false}
            />
        );
        const generateButton = screen.getByTestId('shorten-button');
        fireEvent.click(generateButton);
        expect(mockOnSubmit).toHaveBeenCalledWith(testUrl);
    });

    it('renders error message if error prop is passed', () => {
        const errorMessage = 'Enter a valid URL';
        render(
            <UrlForm
                url={testUrl}
                setUrl={jest.fn()}
                onSubmit={jest.fn()}
                error={errorMessage}
                clearError={jest.fn()}
                loading={false}
            />
        );
        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(errorMessage);
    });
});
