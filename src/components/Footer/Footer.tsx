import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="bg-gray-200 flex justify-center items-center h-[6vh]">
            <p className="text-gray-600 text-sm">
                The contents of this website are deployed from this{' '}
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    open sourced repo
                </a>
            </p>
        </div>
    );
};

export { Footer };
