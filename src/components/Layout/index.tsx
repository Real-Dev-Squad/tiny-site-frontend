import Head from 'next/head';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

type LayoutProps = {
    title: string;
    children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
                <meta
                    name="description"
                    content="Shorten and share URLs with rds.li, a simple and efficient URL shortener."
                />
                <meta name="keywords" content="URL shortener, rds.li, link shortener, short URLs" />
                <meta name="author" content="Real Dev Squad" />
                <meta property="og:title" content="rds.li - URL Shortener" />
                <meta
                    property="og:description"
                    content="Shorten and share URLs with rds.li, a simple and efficient URL shortener."
                />
                <meta property="og:url" content="https://staging-tinysite.realdevsquad.com/" />
                <meta property="og:type" content="website" />
            </Head>
            <Navbar />
            <main className="bg-gray-900 ">
                {children}
                <Link
                    className="fixed bottom-10 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer"
                    data-testid="create-new-button-mobile"
                    href="/"
                >
                    <FaPlus size={20} />
                </Link>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
