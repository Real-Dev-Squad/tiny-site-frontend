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
import { Loader } from '../Loader';

interface UrlListItemProps {
    url: UrlType;
    copyButtonHandler: (url: string) => void;
}

const UrlListItem = ({ url, copyButtonHandler }: UrlListItemProps) => {
    const deleteMutation = useMutation({
        mutationFn: deleteUrlApi,
        onSuccess: () => {
            queryClient.invalidateQueries(['urls']);
        },
        onError: (error) => {
            window.alert('Error deleting URL');
            console.error(error);
        },
    });
    const { userData } = useAuthenticated();

    return (
        <li className="rounded-lg bg-white w-full px-2 py-2 sm:pl-4 sm:pr-10 sm:py-4 flex flex-col">
            <div className="flex items-center gap-2 w-full">
                <div className="flex flex-col w-full">
                    <Link
                        href={`${TINY_SITE}/${url.shortUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-sm font-semibold text-black sm:text-base"
                    >
                        {TINY_SITE}/{url.shortUrl}
                    </Link>
                    <Link
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-sm font-medium text-gray-700 underline-offset-2 hover:underline mt-1"
                    >
                        {url.originalUrl}
                    </Link>
                </div>
                <div className="flex gap-2 ml-auto">
                    <Button
                        className="rounded-full p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                        onClick={() => copyButtonHandler(`${TINY_SITE}/${url.shortUrl}`)}
                        testId="copy-button"
                    >
                        <span className="sr-only">Copy</span>
                        <MdOutlineContentCopy className="text-black" />
                    </Button>

                    <Button
                        disabled={deleteMutation.isLoading}
                        onClick={() => deleteMutation.mutate({ id: url.id, userId: userData?.data?.id })}
                        className={`flex items-center justify-center w-8 h-8 rounded transition active:scale-95 ${
                            deleteMutation.isLoading
                                ? 'text-gray-600 bg-gray-100'
                                : 'text-red-500 hover:text-red-600 hover:bg-red-100 bg-red-50 sm:bg-transparent'
                        }`}
                    >
                        {!deleteMutation.isLoading ? (
                            <TbTrash className="w-5 h-5" />
                        ) : (
                            <Loader className="w-5 h-5 text-gray-400" />
                        )}
                    </Button>
                </div>
            </div>

            <hr className="my-2 border-t border-gray-300" />

            <p className="text-sm text-gray-500 flex items-center gap-2">
                <LiaStopwatchSolid className="text-lg" />
                {formatDate({
                    inputDate: url.createdAt as string,
                    relativeDuration: false,
                    fullDate: true,
                })}
            </p>
        </li>
    );
};

export default UrlListItem;
