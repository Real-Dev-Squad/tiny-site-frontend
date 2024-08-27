import Link from 'next/link';
import { LiaStopwatchSolid } from 'react-icons/lia';
import { useMutation } from 'react-query';

import { TINY_SITE } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import { queryClient } from '@/pages/_app';
import { deleteUrlApi } from '@/services/api';
import { UrlType } from '@/types/url.types';
import formatDate from '@/utils/formatDate';

import { CopyButton, DeleteButton } from './Buttons';

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
        <li className="rounded-xl bg-white px-2 py-2 sm:pl-4 sm:py-4 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 w-full">
                <div className="flex flex-col w-full max-w-[calc(100%-4rem)] sm:max-w-[calc(100%-5rem)]">
                    <Link
                        href={`${TINY_SITE}/${url.shortUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-sm font-semibold text-black sm:text-base underline-offset-2  hover:underline"
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
        </li>
    );
};
export default UrlListItem;
