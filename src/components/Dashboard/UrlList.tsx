import UrlListItem from '@/components/Dashboard/UrlListItem';
import { UrlType } from '@/types/url.types';

interface UrlListProps {
    urls: UrlType[];
    copyButtonHandler: (url: string) => void;
}

const UrlList = ({ urls, copyButtonHandler }: UrlListProps) => {
    return (
        <ul className="flex flex-col justify-center items-center w-full mt-10">
            <h1 className="text-3xl md:text-4xl xl:text-4xl text-center mb-8 text-white font-semibold">Your URLs</h1>
            {urls.map((url) => (
                <UrlListItem key={url.shortUrl} url={url} copyButtonHandler={copyButtonHandler} />
            ))}
        </ul>
    );
};

export default UrlList;
