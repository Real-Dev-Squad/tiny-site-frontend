import React, { useEffect, useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface ModalProps {
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
    width?: string;
    height?: string;
    padding?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title, width = '330px', height = 'auto', padding = '' }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <dialog
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent backdrop-blur-sm z-50"
            data-testid="modal"
        >
            <div
                ref={modalRef}
                className='bg-white rounded-md relative flex flex-col justify-center items-center shadow-lg'
                style={{ width: width, height: height, padding: padding }}
            >
                <button className="absolute top-3 right-3" data-testid="close-modal" onClick={onClose}>
                    <IoCloseSharp style={{ fontSize: '1.5em' }} />
                </button>
                {title && <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>}
                {children}
            </div>
        </dialog>
    );
};

export default Modal;
