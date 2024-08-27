import React from 'react';

const HomeText: React.FC = () => {
    return (
        <div className="pb-2 lg:pb-4 flex flex-col items-center gap-2">
            <h1 className="text-3xl md:text-6xl xl:text-7xl sm:text-5xl text-center text-white font-semibold pb-2 lg:pb-4">
                Shorten Your URL
            </h1>

            <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center text-white font-semibold">
                Perfect Links Every Time
            </h3>

            <p className="xl:text-xl text-base text-white mt-4 text-center">
                Ready to shorten your URL? Enter your
                <br className="sm:hidden" /> URL below
            </p>
        </div>
    );
};

export default HomeText;
