import Link from 'next/link';
import { LiaStopwatchSolid } from 'react-icons/lia';
import { MdOutlineContentCopy } from 'react-icons/md';
import { TbTrash } from 'react-icons/tb';
import { useMutation } from 'react-query';

import { TINY_SITE } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import { queryClient } from '@/pages/_app';
import { deleteUrlApi } from '@/services/api';
import { UrlType } from '@/types/url.types';
import formatDate from '@/utils/formatDate';

import Button from '../Button';

export const DeleteButton: React.FC<{ isLoading: boolean; onDelete: () => void }> = ({ isLoading, onDelete }) => (
    <Button
        loading={isLoading}
        onClick={onDelete}
        className={`flex items-center justify-center w-8 h-8 rounded transition active:scale-95 ${
            isLoading ? 'text-gray-600 bg-gray-100' : 'text-red-500 hover:text-red-600 hover:bg-red-100'
        }`}
        testId="delete-button"
    >
        {!isLoading && <TbTrash className="w-5 h-5" />}
    </Button>
);

export const CopyButton: React.FC<{ onCopy: () => void }> = ({ onCopy }) => (
    <Button
        className="rounded-full p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
        onClick={onCopy}
        testId="copy-button"
    >
        <span className="sr-only">Copy</span>
        <MdOutlineContentCopy className="text-black" />
    </Button>
);

interface UrlListItemProps {
    url: UrlType;
    copyButtonHandler: (url: string) => void;
}

const UrlListItem: React.FC<UrlListItemProps> = ({ url, copyButtonHandler }) => {
    const { userData } = useAuthenticated();
    const deleteMutation = useMutation({
        mutationFn: deleteUrlApi,
        onSuccess: () => queryClient.invalidateQueries(['urls']),
        onError: (error) => {
            window.alert('Error deleting URL');
            console.error(error);
        },
    });

    const handleCopy = () => copyButtonHandler(`${TINY_SITE}/${url.shortUrl}`);
    const handleDelete = () => deleteMutation.mutate({ id: url.id, userId: Number(userData?.data?.id) });

    return (
        <div className="rounded-xl bg-white px-2 py-2 sm:pl-4 sm:py-4 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 w-full">
                <div className="flex flex-col w-full max-w-[calc(100%-4rem)] sm:max-w-[calc(100%-5rem)]">
                    <Link
                        href={`${TINY_SITE}/${url.shortUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-sm font-semibold text-black sm:text-base underline-offset-2 hover:underline"
                    >
                        {TINY_SITE}/{url.shortUrl}
                    </Link>
                    <Link
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-sm font-medium text-gray-700 mt-1.5"
                    >
                        {url.originalUrl}
                    </Link>
                </div>
                <div className="hidden sm:flex flex-shrink-0 gap-2 ml-auto">
                    <CopyButton onCopy={handleCopy} />
                    <DeleteButton
                        isLoading={deleteMutation.isLoading}
                        onDelete={handleDelete}
                        data-testid="delete-button"
                    />
                </div>
            </div>

            <hr className="my-3 border-t border-gray-300" />
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                    <LiaStopwatchSolid className="text-lg" />
                    {formatDate({
                        inputDate: url.createdAt as string,
                        relativeDuration: false,
                        fullDate: true,
                    })}
                </p>
                <div className="flex sm:hidden gap-1 ml-auto">
                    <CopyButton onCopy={handleCopy} />
                    <DeleteButton isLoading={deleteMutation.isLoading} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default UrlListItem;
