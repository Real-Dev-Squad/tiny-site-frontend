import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import Layout from '@/components/Layout';
import { useState } from 'react';
import AddIcon from '../../../public/assets/icons/add';
import CopyIcon from '../../../public/assets/icons/copy';
import ReloadIcon from '../../../public/assets/icons/reload';
import { shortenUrl } from '../../utils/ShortenUrl';
import IsAuthenticated from '@/hooks/isAuthenticated';

const Dashboard = () => {
    const [url, getUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState('');

    const { isLoggedIn, userData } = IsAuthenticated();

    const handleUrl = async () => {
        if (isLoggedIn) {
            const shortUrl = await shortenUrl(url, userData);
            console.log(shortUrl);
            if (shortUrl) {
                setShortUrl(shortUrl);
            }
        } else {
            // User is not authenticated
        }
    };
    return (
        <Layout title="Home | URL Shortener">
            <div className="w-screen">
                <div className="flex flex-col justify-center items-center m-4">
                    <div className="w-full lg:w-[42rem]">
                        <h1 className="text-4xl text-center text-white font-semibold">URL Shortener</h1>{' '}
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-1 my-2">
                            <InputBox
                                type="text"
                                hideLabel={true}
                                className="w-full bg-gray-200 md:rounded-l-2xl p-4 md:rounded-none"
                                onChange={(e) => {
                                    getUrl(e.target.value);
                                }}
                                value={url}
                                placeholder="Enter the URL"
                                name="URL"
                            />
                            <Button
                                className="w-full md:w-auto bg-gray-200 md:rounded-r-2xl  px-4 md:px-8 py-4 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                                onClick={() => handleUrl()}
                            >
                                Generate
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-1">
                            <InputBox
                                type="text"
                                name="URL"
                                hideLabel={true}
                                className="w-full bg-gray-200 md:rounded-l-2xl p-4 md:rounded-none"
                                value={shortUrl}
                                disabled={true}
                                placeholder="Copy the URL"
                            />
                            <div className="flex flex-row justify-center items-center space-x-1">
                                <Button
                                    type="button"
                                    className="w-full h-100 md:w-auto bg-gray-200 px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                                    onClick={() => handleUrl()}
                                >
                                    <ReloadIcon />
                                </Button>
                                <Button
                                    type="button"
                                    className="w-full md:w-auto bg-gray-200 px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                                    onClick={() => {
                                        setShortUrl('');
                                    }}
                                >
                                    <AddIcon />
                                </Button>
                                <Button
                                    type="button"
                                    className="w-full md:w-auto bg-gray-200 md:rounded-r-2xl px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                                    onClick={() => {
                                        navigator.clipboard.writeText(shortUrl);
                                    }}
                                >
                                    <CopyIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
