import { FC, ReactNode } from 'react';

import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
            <main className="bg-gray-900 flex flex-col justify-center items-center h-container">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
