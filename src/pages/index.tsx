import React from 'react';
import { Button } from '../components/Buttons/Button';
import { InputBox } from '../components/InputBox/InputBox';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';

export default function Home() {
    const [url, setUrl] = React.useState('');
    return (
        <div>
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">URL Shortener</h1>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="flex flex-row justify-center items-center space-x-4 m-4">
                        <InputBox
                            size="medium"
                            type="text"
                            placeholder="Enter the URL"
                            variant="primary"
                            onChangeHandler={(e) => {
                                setUrl(e.target.value);
                            }}
                        />
                        <Button
                            label="Shorten URL"
                            variant="primary"
                            size="medium"
                            handleClick={() => {
                                setUrl(url);
                            }}
                        />
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-4 m-4 bg-secondary">
                        <p className="text-white text-md font-semibold px-4">{url}</p>
                        <Button
                            label="Copy URL"
                            variant="secondary"
                            size="medium"
                            handleClick={() => {
                                console.log('Button clicked');
                            }}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
