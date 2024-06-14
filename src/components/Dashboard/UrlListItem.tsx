import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { MdOutlineContentCopy } from 'react-icons/md';
import { TbTrash, TbWorldWww } from 'react-icons/tb';

import { TINY_SITE } from '@/constants/url';
import { useDeleteUrlMutation } from '@/services/api';
import { UrlType } from '@/types/url.types';
import formatDate from '@/utils/formatDate';

import Button from '../Button';
import { Loader } from '../Loader';

interface UrlListItemProps {
    url: UrlType;
    copyButtonHandler: (url: string) => void;
}

const UrlListItem = ({ url, copyButtonHandler }: UrlListItemProps) => {
    const deleteMutation = useDeleteUrlMutation();

    return (
        <li className="flex m-1 border-gray-50 rounded-lg border-2 bg-white  w-[100%] sm:w-[60%] sm:m-2 px-2 py-2 sm:px-4 sm:py-2 items-center">
            <div className="mr-2 flex items-center justify-center">
                <TbWorldWww className="text-black text-opacity-70 text-4xl" />
            </div>
            <div className="flex flex-col w-[85%]">
                <div className="flex max-w-fit items-center space-x-2 ">
                    <Link
                        href={`${TINY_SITE}/${url.shortUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full  truncate text-sm font-semibold text-blue-800 sm:max-w-[300px] sm:text-base md:max-w-[360px] xl:max-w-[500px]"
                    >
                        {TINY_SITE}/{url.shortUrl}
                    </Link>
                    <Button
                        className="rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                        onClick={() => copyButtonHandler(`${TINY_SITE}/${url.shortUrl}`)}
                        testId="copy-button"
                    >
                        <span className="sr-only">Copy</span>
                        <MdOutlineContentCopy className="text-black" />
                    </Button>
                </div>
                <Link
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center   w-[100%]  truncate text-sm font-medium text-gray-700 underline-offset-2 hover:underline "
                >
                    {url.originalUrl}
                </Link>
                <Tooltip
                    className="bg-gray-900 text-white py-1 px-2 rounded-lg"
                    placement="right"
                    color="primary"
                    content={formatDate({
                        inputDate: url.createdAt as string,
                        relativeDuration: false,
                        fullDate: true,
                    })}
                >
                    <p className=" whitespace-nowrap text-sm text-gray-500  w-fit ">
                        <span className="font-bold">Created on : </span>{' '}
                        {formatDate({ inputDate: url.createdAt as string, relativeDuration: true, fullDate: false })}
                    </p>
                </Tooltip>
            </div>

            <div>
                <Button
                    disabled={deleteMutation.isLoading}
                    onClick={() => deleteMutation.mutate({ id: url.id })}
                    className={`w-8 grid place-items-center h-8 rounded transition -mr-8 active:scale-95 ${
                        deleteMutation.isLoading
                            ? 'text-gray-600 bg-gray-100'
                            : 'text-red-500 hover:text-red-600 hover:bg-red-100'
                    }`}
                >
                    {!deleteMutation.isLoading && <TbTrash className="w-5 h-5" />}
                    {deleteMutation.isLoading && <Loader className="w-5 h-5 text-gray-400" />}
                </Button>
            </div>
        </li>
    );
};

export default UrlListItem;
