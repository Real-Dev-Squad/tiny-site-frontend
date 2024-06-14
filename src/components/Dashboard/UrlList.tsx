import UrlListItem from '@/components/Dashboard/UrlListItem';
import { UrlType } from '@/types/url.types';

interface UrlListProps {
    urls: UrlType[];
    copyButtonHandler: (url: string) => void;
}

const MAX_URLS = 50;

const UrlList = ({ urls, copyButtonHandler }: UrlListProps) => {
    const remainingUrls = MAX_URLS - urls.length;

    return (
        <div className="w-full mt-10 flex flex-col justify-center items-center max-w-3xl mx-auto">
            <div className="flex items-center pb-8 w-full justify-between">
                <h1 className="text-3xl md:text-4xl xl:text-4xl text-center text-white font-semibold">Your URLs</h1>

                <h4>
                    Remaining: {remainingUrls} / {MAX_URLS}
                </h4>
            </div>

            <ul className="w-full space-y-3">
                {urls.map((url) => (
                    <UrlListItem key={url.shortUrl} url={url} copyButtonHandler={copyButtonHandler} />
                ))}
            </ul>
        </div>
    );
};

export default UrlList;
