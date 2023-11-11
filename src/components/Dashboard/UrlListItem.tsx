import CopyIcon from '../../../public/assets/icons/copy';
import InternetIcon from '../../../public/assets/icons/internet';
import Link from 'next/link';
import { TINY_SITE } from '@/constants/url';
import { UrlType } from '@/types/url.types';
import formatDate from '@/utils/formatDate';

interface UrlListItemProps {
    url: UrlType;
    copyButtonHandler: (url: string) => void;
}

const UrlListItem = ({ url, copyButtonHandler }: UrlListItemProps) => {
    return (
        <li className="flex  m-2 border-gray-50 rounded-lg border-2 bg-white px-4 py-2 w-full">
            <div className="flex items-center justify-center  ">
                <InternetIcon width={50} height={50} />
            </div>
            <div className="flex flex-col sm:flex-row w-full">
                <div className="flex shrink items-center  w-[60%]">
                    <div className="ml-2 sm:ml-4 w-[100%]">
                        <div className="flex max-w-fit items-center space-x-2 ">
                            <Link
                                href={`${TINY_SITE}/${url.ShortUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full max-w-[140px] truncate text-sm font-semibold text-blue-800 sm:max-w-[300px] sm:text-base md:max-w-[360px] xl:max-w-[500px]"
                            >
                                {TINY_SITE}/{url.ShortUrl}
                            </Link>
                            <button
                                className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95"
                                onClick={() => copyButtonHandler(url.OriginalUrl)}
                            >
                                <span className="sr-only">Copy</span>
                                <CopyIcon width={15} height={15} />
                            </button>
                        </div>
                        <div className="flex max-w-fit items-center space-x-1">
                            <Link
                                href={url.OriginalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="xs:block  max-w-[200px] truncate text-sm font-medium text-gray-700 underline-offset-2 hover:underline sm:max-w-[300px] md:max-w-[400px] xl:max-w-[440px]"
                            >
                                {url.OriginalUrl}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 ml-auto ">
                    <p className="whitespace-nowrap text-sm text-gray-500">
                        <span className="font-bold">Created on : </span> {formatDate(url.CreatedAt)}
                    </p>
                </div>
            </div>
        </li>
    );
};

export default UrlListItem;
