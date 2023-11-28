import React from 'react';

const UrlShimmer = () => {
    return (
        <li className="flex m-1 border-gray-50 rounded-lg border-2 bg-white w-[100%] sm:w-[60%] sm:m-2 px-2 py-2 sm:px-4 sm:py-2 animate-pulse">
            <div className="mr-2 flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex flex-col w-[85%]">
                <div className="flex items-center w-[40%] truncate m-1 bg-gray-300 h-4"></div>
                <div className="flex items-center w-[100%] truncate m-1 bg-gray-300 h-4"></div>
                <div className="flex items-center w-[80%] truncate m-1 bg-gray-300 h-4"></div>
            </div>
        </li>
    );
};

const DashboardShimmer = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen" data-testid="dashboard-shimmer">
            <div className="flex flex-col justify-center items-center w-full mt-10">
                <h1 className="text-3xl md:text-4xl xl:text-4xl text-center mb-8 text-white font-semibold">
                    Your URLs
                </h1>
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <UrlShimmer key={index} />
                    ))}
            </div>
        </div>
    );
};

export default DashboardShimmer;
