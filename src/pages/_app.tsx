import '@/styles/global.css';

import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface MyAppProps {
    Component: React.FC<AppProps>;
    pageProps: AppProps;
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            refetchOnWindowFocus: false,
        },
    },
});

export default function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}
