import { MdOutlineContentCopy } from 'react-icons/md';
import { TbTrash } from 'react-icons/tb';

import Button from '../Button';
import { Loader } from '../Loader';

interface DeleteButtonProps {
    isLoading: boolean;
    onDelete: () => void;
}

interface CopyButtonProps {
    onCopy: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ isLoading, onDelete }) => (
    <Button
        disabled={isLoading}
        onClick={onDelete}
        className={`flex items-center justify-center w-8 h-8 rounded transition active:scale-95 ${
            isLoading ? 'text-gray-600 bg-gray-100' : 'text-red-500 hover:text-red-600 hover:bg-red-100'
        }`}
        testId="delete-button"
    >
        {!isLoading ? (
            <TbTrash className="w-5 h-5" />
        ) : (
            <Loader className="w-5 h-5 text-gray-400" data-testid="loader" />
        )}
    </Button>
);

export const CopyButton: React.FC<CopyButtonProps> = ({ onCopy }) => (
    <Button
        className="rounded-full p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
        onClick={onCopy}
        testId="copy-button"
    >
        <span className="sr-only">Copy</span>
        <MdOutlineContentCopy className="text-black" />
    </Button>
);
