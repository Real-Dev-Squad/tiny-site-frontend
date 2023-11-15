import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Toast from '../../src/components/Toast';

describe('Toast', () => {
    const onDismiss = jest.fn();

    test('should render the toast component with the message', () => {
        render(
            <Toast
                message="This is a toast message"
                isVisible={true}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="success"
            />
        );

        expect(screen.getByText('This is a toast message')).toBeInTheDocument();
        expect(screen.getByTestId('toast')).toBeInTheDocument();
    });

    test('should not call onDismiss function when the timeToShow is not completed', () => {
        render(
            <Toast
                message="This is a toast message"
                isVisible={true}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="success"
            />
        );

        expect(onDismiss).not.toHaveBeenCalled();
    });

    test('should call onDismiss function when the timeToShow is completed', async () => {
        render(
            <Toast
                message="This is a toast message"
                isVisible={true}
                timeToShow={0}
                onDismiss={onDismiss}
                type="success"
            />
        );

        await waitFor(() => expect(onDismiss).toHaveBeenCalled());
    });

    test('should render the error toast component with the message', () => {
        render(
            <Toast
                message="This is a toast message"
                isVisible={true}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="error"
            />
        );

        expect(screen.getByText('This is a toast message')).toBeInTheDocument();
        expect(screen.getByTestId('toast')).toBeInTheDocument();
    });

    test('should render the info toast component with the message', () => {
        render(
            <Toast
                message="This is a toast message"
                isVisible={true}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="info"
            />
        );

        expect(screen.getByText('This is a toast message')).toBeInTheDocument();
        expect(screen.getByTestId('toast')).toBeInTheDocument();
    });

    test('should become invisible when isVisible is false', async () => {
        render(
            <Toast
                message="This is a toast message"
                isVisible={false}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="success"
            />
        );
        const toastContainer = screen.getByTestId('toast');
        expect(toastContainer).toBeInTheDocument();

        waitFor(() => expect(toastContainer).not.toBeInTheDocument());
    });
});
