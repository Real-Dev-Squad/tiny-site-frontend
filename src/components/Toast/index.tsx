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
            className="absolute md:top-10 md:right-10 bottom-10 left-1/2 transform -translate-x-1/2 md:translate-x-0 bg-gray-900 text-white px-4 py-2 rounded-lg border-2 border-cyan-100
            max-h-10 flex items-center justify-center z-50 
            "
            data-testid="toast"
        >
            {message}
        </div>
    ) : null;
};

export default Toast;
