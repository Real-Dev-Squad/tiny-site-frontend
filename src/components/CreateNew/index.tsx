import Link from 'next/link';
import React, { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';

function CreateNew() {
    const router = useRouter();
    const { pathname } = router;

    if (pathname === '/') {
        return null;
    }
    return (
        <Link
            className="fixed bottom-10 right-4 w-12 h-12 hover:w-auto p-3 bg-blue-500 text-white cursor-pointer rounded-full hover:duration-[0.3s] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center group flex-row hover:gap-2"
            href="/"
            data-testid="create-new-link"
        >
            <FaPlus size={20} />
            <span className="w-[0%] opacity-0 group-hover:w-[100%] group-hover:opacity-100">Create New</span>
        </Link>
    );
}

export default CreateNew;
