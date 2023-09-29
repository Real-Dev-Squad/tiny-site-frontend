import '@/styles/global.css';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';

export default function MyApp({ Component, pageProps }) {
    return (
        <div>
            <title>URL Shortener</title>
            <Navbar />
            <div className="bg-gray-900 flex flex-col justify-center items-center h-container">
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}
