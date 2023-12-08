import { useEffect, useState } from 'react';

import { ToastType } from '@/types/toast.tyes';

let toastIdCounter = 0;

const useToast = () => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const showToast = (message: string, timeToShow = 3000, type?: 'success' | 'error' | 'info') => {
        const newToast: ToastType = {
            id: toastIdCounter++,
            message,
            isVisible: true,
            timeToShow,
            onDismiss: () => dismissToast(newToast),
            type,
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const dismissToast = (dismissedToast: ToastType) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast !== dismissedToast));
    };

    useEffect(() => {
        const expiredToasts = toasts.filter((toast) => !toast.isVisible);
        expiredToasts.forEach((toast) => dismissToast(toast));
    }, [toasts]);

    return { showToast, toasts };
};

export default useToast;
