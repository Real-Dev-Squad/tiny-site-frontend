import { QueryClient, QueryClientProvider } from 'react-query';

import CreateNew from '@/components/CreateNew';
const queryClient = new QueryClient();
import '@/styles/global.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <CreateNew />
        </QueryClientProvider>
    );
}
