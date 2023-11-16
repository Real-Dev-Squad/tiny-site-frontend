import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import { MdDone, MdError, MdInfo } from 'react-icons/md';

import { ToastType } from '@/types/toast.tyes';

const typeClassMap = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    default: 'bg-blue-500 text-white',
};

const iconMap: Record<string, React.ReactElement> = {
    success: <MdDone size={24} />,
    error: <MdError size={24} />,
    default: <MdInfo size={24} />,
};

const Toast: FC<ToastType> = ({ message, isVisible, timeToShow, onDismiss, type }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, timeToShow);

            return () => clearTimeout(timer);
        }
    }, [isVisible, timeToShow, onDismiss]);

    const toastType = type as keyof typeof typeClassMap;
    const icon = iconMap[toastType] || iconMap.default;
    const toastClasses = typeClassMap[toastType] || typeClassMap.default;

    return (
        <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.5 }}
            data-testid="toast-div"
            className={`fixed top-16 right-4 p-4 rounded-md shadow-md ${
                isVisible ? 'visible' : 'invisible'
            } ${toastClasses}`}
        >
            <div className="flex items-center justify-center">
                {icon}
                <p className="ml-2" data-testid="toast">
                    {message}
                </p>
            </div>
        </motion.div>
    );
};

export default Toast;
