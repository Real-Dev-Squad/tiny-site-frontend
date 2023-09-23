import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="bg-gray-200 flex justify-center items-center h-16">
            <p className="text-gray-600 text-sm">
                Made with ❤️ by{' '}
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    @saurabhnative
                </a>
            </p>
        </div>
    );
};

export { Footer };
