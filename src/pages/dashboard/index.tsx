import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import Layout from '@/components/Layout';
import { randomString } from '@/utils/constants';
import { useState } from 'react';
import CopyIcon from '../../../public/assets/icons/copy';

const Dashboard = () => {
    const [url, getUrl] = useState<string>('');
    const [shortUrl, setUrl] = useState<string>('');

    const handleUniqueUrl = () => {
        setUrl(`https://rds.li/${randomString}`);
    };
    return (
        <Layout title="Home | URL Shortener">
            <div className="w-screen">
                <div className="flex flex-col justify-center items-center m-4">
                    <div className="w-full lg:w-[42rem] md:w-[32rem] sm:w-[22rem]">
                        <h1 className="text-4xl text-center text-white font-semibold">URL Shortener</h1>{' '}
                        <div className="bg-gray-200 flex flex-row justify-center items-center space-y-0 space-x-0 rounded-2xl mt-5 sm:mt-10">
                            <InputBox
                                type="text"
                                hideLabel={true}
                                className="bg-gray-200 w-full outline-none p-4 rounded-l-2xl"
                                onChange={(e) => getUrl(e.target.value)}
                                value={url}
                                placeholder="🔗 Enter the URL"
                                name="URL"
                            />
                            <Button
                                className="bg-gray-300 rounded-r-2xl p-4 hover:bg-gray-400"
                                onClick={handleUniqueUrl}
                            >
                                Generate
                            </Button>
                        </div>
                        <div className="bg-gray-200 flex flex-row justify-center items-center space-y-0 space-x-0 rounded-2xl mt-2">
                            <InputBox
                                type="text"
                                name="URL"
                                hideLabel={true}
                                className="bg-gray-200 w-full outline-none p-4 rounded-l-2xl"
                                value={shortUrl}
                                placeholder="Copy the URL"
                            />
                            <Button
                                type="button"
                                className="bg-gray-200 rounded-r-2xl p-4 hover:bg-gray-400"
                                onClick={() => navigator.clipboard.writeText(shortUrl)}
                            >
                                <CopyIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
