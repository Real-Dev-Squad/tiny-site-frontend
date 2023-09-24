import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 h-[8vh]">
            <div className="flex items-center  justify-between">
                <a href="#" className="text-white text-2xl font-bold">
                    URL Shortener
                </a>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="text-white">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export { Navbar };
