import '@/styles/global.css';

import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import CreateNew from '@/components/CreateNew';

interface MyAppProps {
    Component: React.FC<AppProps>;
    pageProps: AppProps;
}

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <CreateNew />
        </QueryClientProvider>
    );
}
