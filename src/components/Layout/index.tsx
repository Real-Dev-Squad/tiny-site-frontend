import Head from 'next/head';
import { FC, ReactNode } from 'react';

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
                    content="Shorten and share URLs with Real Dev Squad, a simple and efficient URL shortener."
                />
                <meta name="keywords" content="URL shortener, Real Dev Squad, link shortener, short URLs" />
                <meta name="author" content="Real Dev Squad" />
                <meta property="og:title" content="Real Dev Squad - URL Shortener" />
                <meta
                    property="og:description"
                    content="Shorten and share URLs with Real Dev Squad, a simple and efficient URL shortener."
                />
                <meta property="og:url" content="https://rds.realdevsquad.com/" />
                <meta property="og:type" content="website" />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
