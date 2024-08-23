import { fireEvent, render, screen } from '@testing-library/react';

import InputSection from '@/components/App/InputSection';

describe('InputSection component', () => {
    const testUrl = 'https://stackoverflow.com/questions/26944762/when-to-use-chore-as-type-of-commit-message';

    it('renders InputSection component correctly', () => {
        const mockSetUrl = jest.fn();
        const mockHandleUrl = jest.fn();
        const mockClearError = jest.fn();
        render(
            <InputSection
                url={testUrl}
                setUrl={mockSetUrl}
                handleUrl={mockHandleUrl}
                error={null}
                clearError={mockClearError}
            />
        );
        expect(screen.getByTestId('url-input')).toBeInTheDocument();
        expect(screen.getByTestId('shorten-button')).toBeInTheDocument();
    });

    it('calls setUrl function on input change and clearError', () => {
        const mockSetUrl = jest.fn();
        const mockHandleUrl = jest.fn();
        const mockClearError = jest.fn();
        render(
            <InputSection
                url={testUrl}
                setUrl={mockSetUrl}
                handleUrl={mockHandleUrl}
                error={null}
                clearError={mockClearError}
            />
        );
        const inputElement = screen.getByTestId('url-input');
        fireEvent.change(inputElement, { target: { value: 'https://realdevsquad.com' } });
        expect(mockSetUrl).toHaveBeenCalledWith('https://realdevsquad.com');
        expect(mockClearError).toHaveBeenCalled();
    });

    it('calls handleUrl function on button click', () => {
        const mockSetUrl = jest.fn();
        const mockHandleUrl = jest.fn();
        const mockClearError = jest.fn();
        render(
            <InputSection
                url={testUrl}
                setUrl={mockSetUrl}
                handleUrl={mockHandleUrl}
                error={null}
                clearError={mockClearError}
            />
        );
        const generateButton = screen.getByTestId('shorten-button');
        fireEvent.click(generateButton);
        expect(mockHandleUrl).toHaveBeenCalled();
    });

    it('renders the heading correctly', () => {
        render(
            <InputSection url={testUrl} setUrl={jest.fn()} handleUrl={jest.fn()} error={null} clearError={jest.fn()} />
        );
        expect(screen.getByTestId('heading')).toHaveTextContent('Shorten Your URL');
    });

    it('renders the subheading correctly', () => {
        render(
            <InputSection url={testUrl} setUrl={jest.fn()} handleUrl={jest.fn()} error={null} clearError={jest.fn()} />
        );
        expect(screen.getByTestId('subheading')).toHaveTextContent('Perfect Links Every Time');
    });

    it('renders the paragraph text correctly', () => {
        render(
            <InputSection url={testUrl} setUrl={jest.fn()} handleUrl={jest.fn()} error={null} clearError={jest.fn()} />
        );
        expect(screen.getByTestId('paragraph')).toHaveTextContent(/Ready to shorten your URL\? Enter your/i);
    });

    it('renders error message if error prop is passed', () => {
        const errorMessage = 'Enter a valid URL';
        render(
            <InputSection
                url={testUrl}
                setUrl={jest.fn()}
                handleUrl={jest.fn()}
                error={errorMessage}
                clearError={jest.fn()}
            />
        );
        const errorElement = screen.getByTestId('error-message');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(errorMessage);
    });
});
