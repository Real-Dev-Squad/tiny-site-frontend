import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import { MdDone, MdError, MdInfo } from 'react-icons/md';

import { ToastType } from '@/types/toast.tyes';

const Toast: FC<ToastType> = ({ message, isVisible, timeToShow, onDismiss, type }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, timeToShow);

            return () => clearTimeout(timer);
        }
    }, [isVisible, timeToShow, onDismiss]);

    return (
        <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.5 }}
            className={`fixed top-16 right-4 p-4 rounded-md shadow-md ${isVisible ? 'visible' : 'invisible'} ${
                type === 'success'
                    ? 'bg-green-500 text-white'
                    : type === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white'
            }`}
        >
            {type ? (
                <div className=" flex items-center justify-center">
                    {type === 'success' ? (
                        <MdDone size={24} />
                    ) : type === 'error' ? (
                        <MdError size={24} />
                    ) : (
                        <MdInfo size={24} />
                    )}
                    <p className="ml-2" data-testid="toast">
                        {message}
                    </p>
                </div>
            ) : (
                <p data-testid="toast">{message}</p>
            )}
        </motion.div>
    );
};

export default Toast;
