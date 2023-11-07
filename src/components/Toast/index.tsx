import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    timeToShow: number;
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, timeToShow, onDismiss }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, timeToShow);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, timeToShow, onDismiss]);

    return isVisible ? (
        <div
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg border-2 border-cyan-100"
            data-testid="toast"
        >
            {message}
        </div>
    ) : null;
};

export default Toast;
