import Link from 'next/link';

import { TINY_SITE } from '@/constants/url';

const RedirectFooter = () => (
    <footer className="absolute bottom-0 right-0 p-2 text-gray-500 w-screen flex justify-center items-center">
        <Link
            className="text-sm text-white font-bold cursor-pointer hover:underline"
            href={TINY_SITE}
            target="_blank"
            rel="noopener noreferrer"
        >
            By <span className="font-bold">Real Dev Squad</span>
        </Link>
    </footer>
);

export default RedirectFooter;
