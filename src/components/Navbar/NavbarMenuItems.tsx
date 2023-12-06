import Link from 'next/link';

import { TINY_API_LOGOUT } from '@/constants/url';

interface NavbarMenuItemsProps {
    menuOpen: boolean;
}

const NavbarMenuItems = ({ menuOpen }: NavbarMenuItemsProps) => {
    return (
        <ul
            className={`${menuOpen ? 'block' : 'hidden'} absolute top-[10vh] right-0 bg-gray-800 p-2 z-10  
            rounded-[8px] shadow-lg
            `}
            data-testid="navbar-menu-items"
        >
            <li>
                <Link href="/" className="text-white hover:bg-gray-700 block w-full px-4 py-2">
                    Create New
                </Link>
            </li>
            <li>
                <Link href="/dashboard" className="text-white hover:bg-gray-700 block px-4 py-2">
                    Dashboard
                </Link>
            </li>
            <li>
                <Link href={TINY_API_LOGOUT} className="text-white hover:bg-gray-700 block px-4 py-2">
                    Sign Out
                </Link>
            </li>
        </ul>
    );
};

export default NavbarMenuItems;
