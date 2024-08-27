import { fireEvent, render, screen } from '@testing-library/react';

import { CopyButton, DeleteButton } from '@/components/Dashboard/Buttons';

describe('DeleteButton', () => {
    const onDelete = jest.fn();

    it('renders correctly', () => {
        render(<DeleteButton isLoading={false} onDelete={onDelete} />);
        const deleteButton = screen.getByTestId('delete-button');
        expect(deleteButton).toBeInTheDocument();
    });

    it('triggers onDelete when clicked', () => {
        render(<DeleteButton isLoading={false} onDelete={onDelete} />);
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);
        expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('displays loader when isLoading is true', () => {
        render(<DeleteButton isLoading={true} onDelete={onDelete} />);
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });

    it('disables button when isLoading is true', () => {
        render(<DeleteButton isLoading={true} onDelete={onDelete} />);
        const deleteButton = screen.getByTestId('delete-button');
        expect(deleteButton).toBeDisabled();
    });
});

describe('CopyButton', () => {
    const onCopy = jest.fn();

    it('renders correctly', () => {
        render(<CopyButton onCopy={onCopy} />);
        const copyButton = screen.getByTestId('copy-button');
        expect(copyButton).toBeInTheDocument();
    });

    it('triggers onCopy when clicked', () => {
        render(<CopyButton onCopy={onCopy} />);
        const copyButton = screen.getByTestId('copy-button');
        fireEvent.click(copyButton);
        expect(onCopy).toHaveBeenCalledTimes(1);
    });
});
