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
            </Head>
            <Navbar />
            <main className="bg-gray-900 ">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
