import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Toast from '../../src/components/Toast';

describe('Toast', () => {
    const onDismiss = jest.fn();

    test('should render the toast component with the message', () => {
        render(<Toast message="This is a toast message" isVisible={true} timeToShow={5000} onDismiss={onDismiss} />);

        expect(screen.getByText('This is a toast message')).toBeInTheDocument();
    });

    test('should not call onDismiss function when the timeToShow is not completed', () => {
        render(<Toast message="This is a toast message" isVisible={true} timeToShow={5000} onDismiss={onDismiss} />);

        expect(onDismiss).not.toHaveBeenCalled();
    });

    test('should call onDismiss function when the timeToShow is completed', async () => {
        render(<Toast message="This is a toast message" isVisible={true} timeToShow={0} onDismiss={onDismiss} />);

        await waitFor(() => expect(onDismiss).toHaveBeenCalled());
    });
});
