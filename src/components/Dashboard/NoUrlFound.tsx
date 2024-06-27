import Link from 'next/link';

const NoUrlFound = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center p-4 text-white bg-gray-900 min-h-[86vh] ">
            <h5 className="text-white text-2xl pb-2 font-semibold text-center leading-relaxed">
                <span className="block">Oops! We couldn't find any URLs.</span>
                <span className="block">Would you like to create one?</span>
            </h5>
            <Link
                href="/"
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white font-semibold py-2 px-4 rounded-lg mt-4"
            >
                Create a URL
            </Link>
        </div>
    );
};

export default NoUrlFound;
