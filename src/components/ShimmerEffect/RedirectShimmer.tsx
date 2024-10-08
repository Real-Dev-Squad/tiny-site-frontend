import React from 'react';

const RedirectShimmer = () => {
    return (
        <section
            className="w-screen min-h-screen flex flex-col items-center justify-center bg-custom-blue text-gray-400 p-4"
            data-testid="redirect-shimmer"
        >
            <div className="text-lg animate-pulse bg-gray-400 h-6 w-2/3 rounded mb-2"></div>
            <p className="text-xl font-bold text-center truncate animate-pulse bg-gray-400 h-8 w-4/5 rounded mb-2"></p>
            <div className="text-lg animate-pulse bg-gray-400 h-6 w-2/3 rounded mb-2"></div>

            <footer className="absolute bottom-0 right-0 p-2 text-gray-400 w-screen flex justify-center items-center">
                <a className="text-xl text-white font-bold cursor-pointer hover:underline animate-pulse">
                    By <span className="font-bold">Real Dev Squad</span>
                </a>
            </footer>
        </section>
    );
};

export default RedirectShimmer;
