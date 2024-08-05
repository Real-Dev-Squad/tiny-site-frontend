import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarMenuItems = () => {
    const router = useRouter();

    return (
        <ul className="flex gap-14 items-center" data-testid="navbar-menu-items">
            <>
                <li className={`relative ${router.pathname === '/' ? 'border-b-2 border-white' : ''}`}>
                    <Link href="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                </li>
                <li className={`relative ${router.pathname === '/dashboard' ? 'border-b-2 border-white' : ''}`}>
                    <Link href="/dashboard" className="text-white hover:text-gray-300">
                        Dashboard
                    </Link>
                </li>
            </>
        </ul>
    );
};

export default NavbarMenuItems;
