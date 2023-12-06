import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
import '@/styles/global.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}
