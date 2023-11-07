import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import Layout from '@/components/Layout';
import { useState } from 'react';
import AddIcon from '../../../public/assets/icons/add';
import CopyIcon from '../../../public/assets/icons/copy';
import ReloadIcon from '../../../public/assets/icons/reload';

const Dashboard = () => {
    const [url, getUrl] = useState<string>('');
    const [shortUrl, setUrl] = useState<string>('');

    async function shortenUrl(originalUrl: unknown) {
        try {
            const response = await fetch('http://localhost:8000/v1/tinyurl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    OriginalUrl: originalUrl,
                    Comment: 'your',
                    CreatedBy: 'vinit',
                    UserId: 1,
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                return data.shortUrl;
            } else {
                console.error('Error shortening URL:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            return null;
        }
    }

    const handleUniqueUrl = async () => {
        const shortenedUrl = await shortenUrl(url);
        if (shortenedUrl) {
            setUrl(shortenedUrl);
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
                                onClick={() => handleUniqueUrl()}
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
                                    onClick={() => handleUniqueUrl()}
                                >
                                    <ReloadIcon />
                                </Button>
                                <Button
                                    type="button"
                                    className="w-full md:w-auto bg-gray-200 px-4 md:px-8 py-3 hover:bg-gray-300 mt-2 md:mt-0 md:rounded-none"
                                    onClick={() => {
                                        setUrl('');
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
