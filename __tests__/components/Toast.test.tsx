import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Toast from '../../src/components/Toast';

describe('Toast', () => {
    const onDismiss = jest.fn();

    test('should render the toast component with the message', () => {
        render(
            <Toast
                id={1}
                message="This is a toast message"
                isVisible={true}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="success"
            />
        );

        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('This is a toast message')).toBeInTheDocument();
    });

    test('should not call onDismiss function when the timeToShow is not completed', () => {
        render(
            <Toast
                id={1}
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
                id={1}
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
                id={1}
                message="Error message"
                isVisible={true}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="error"
            />
        );

        const toastDiv = screen.getByTestId('toast-div');

        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
        expect(toastDiv.classList.contains('bg-red-500')).toBeTruthy();
    });

    test('should render the info toast component with the message', () => {
        render(
            <Toast id={1} message="Info message" isVisible={true} timeToShow={5000} onDismiss={onDismiss} type="info" />
        );

        const toastDiv = screen.getByTestId('toast-div');
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('Info message')).toBeInTheDocument();
        expect(toastDiv.classList.contains('bg-blue-500')).toBeTruthy();
    });

    test('should become invisible when isVisible is false', async () => {
        render(
            <Toast
                id={1}
                message="This is a toast message"
                isVisible={false}
                timeToShow={5000}
                onDismiss={onDismiss}
                type="success"
            />
        );
        const toastContainer = screen.getByTestId('toast-div');
        expect(toastContainer).toBeInTheDocument();

        waitFor(() => expect(toastContainer).not.toBeInTheDocument());
    });
});
