import Head from 'next/head';
import { FC, ReactNode } from 'react';

import Navbar from '@/components/Navbar';

interface TClassNames {
    main: string;
    container: string;
}

interface LayoutProps {
    title: string;
    children: ReactNode;
    classNames?: Partial<TClassNames>;
}

const Layout: FC<LayoutProps> = ({ title, children, classNames }) => {
    return (
        <div className={classNames?.container}>
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
                <meta property="og:url" content="https://tiny.realdevsquad.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://tiny.realdevsquad.com/rds.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Real Dev Squad - URL Shortener" />
                <meta
                    name="twitter:description"
                    content="Shorten and share URLs with Real Dev Squad, a simple and efficient URL shortener"
                />
                <meta property="twitter:image" content="https://tiny.realdevsquad.com/rds.png" />
                <meta name="twitter:creator" content="@RealDevSquad" />
                <meta name="twitter:image:width" content="1200" />
                <meta name="twitter:image:height" content="630" />
            </Head>

            <Navbar />

            <main className={classNames?.main}>{children}</main>
        </div>
    );
};

export default Layout;
