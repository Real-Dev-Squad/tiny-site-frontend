import Link from 'next/link';

import { TINY_SITE } from '@/constants/url';

const RedirectFooter = () => (
    <div className="absolute bottom-0 right-0 p-2 text-gray-500 w-screen flex justify-center items-center">
        <Link
            className="text-sm text-gray-400 font-bold cursor-pointer hover:underline"
            href={TINY_SITE}
            target="_blank"
            rel="noopener noreferrer"
        >
            By <span className="font-bold">Real Dev Squad</span>
        </Link>
    </div>
);

export default RedirectFooter;
