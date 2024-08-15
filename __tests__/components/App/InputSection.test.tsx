import { fireEvent, render, screen } from '@testing-library/react';

import InputSection from '@/components/App/InputSection';

describe('InputSection component', () => {
    const testUrl = 'https://stackoverflow.com/questions/26944762/when-to-use-chore-as-type-of-commit-message';
    it('renders InputSection component correctly', () => {
        const mockSetUrl = jest.fn();
        const mockHandleUrl = jest.fn();
        render(<InputSection url={testUrl} setUrl={mockSetUrl} handleUrl={mockHandleUrl} />);
        expect(screen.getByPlaceholderText('Enter the URL')).toBeInTheDocument();
        expect(screen.getByText('Shorten')).toBeInTheDocument();
    });

    it('calls setUrl function on input change', () => {
        const mockSetUrl = jest.fn();
        const mockHandleUrl = jest.fn();
        render(<InputSection url={testUrl} setUrl={mockSetUrl} handleUrl={mockHandleUrl} />);
        const inputElement = screen.getByPlaceholderText('Enter the URL');
        fireEvent.change(inputElement, { target: { value: 'https://realdevsquad.com' } });
        expect(mockSetUrl).toHaveBeenCalledWith('https://realdevsquad.com');
    });

    it('calls handleUrl function on button click', () => {
        const mockSetUrl = jest.fn();
        const mockHandleUrl = jest.fn();
        render(<InputSection url={testUrl} setUrl={mockSetUrl} handleUrl={mockHandleUrl} />);
        const generateButton = screen.getByText('Shorten');
        fireEvent.click(generateButton);
        expect(mockHandleUrl).toHaveBeenCalled();
    });

    it('renders the heading correctly', () => {
        render(<InputSection url={testUrl} setUrl={jest.fn()} handleUrl={jest.fn()} />);
        expect(screen.getByText('Shorten Your URL')).toBeInTheDocument();
    });

    it('renders the subheading correctly', () => {
        render(<InputSection url={testUrl} setUrl={jest.fn()} handleUrl={jest.fn()} />);
        expect(screen.getByText('Perfect Links Every Time')).toBeInTheDocument();
    });

    it('renders the paragraph text correctly', () => {
        render(<InputSection url={testUrl} setUrl={jest.fn()} handleUrl={jest.fn()} />);
        expect(screen.getByText(/Ready to shorten your URL\? Enter your/i)).toBeInTheDocument();
    });
});
