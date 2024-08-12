import React from 'react';

const UrlShimmer = () => {
    return (
        <li className="flex border-gray-50 rounded-lg border-2 bg-white w-full sm:m-2 px-2 py-2 sm:px-4 sm:py-2 animate-pulse">
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
        <div className="w-full space-y-3" data-testid="dashboard-shimmer">
            {Array(5)
                .fill(0)
                .map((_, index) => (
                    <UrlShimmer key={index} />
                ))}
        </div>
    );
};

export default DashboardShimmer;
