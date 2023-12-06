import Link from 'next/link';

const NoUrlFound = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-white">No URLs found</p>
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4">
                Create one
            </Link>
        </div>
    );
};

export default NoUrlFound;
