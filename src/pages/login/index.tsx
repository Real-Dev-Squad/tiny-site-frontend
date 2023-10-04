import InputBox from '@/components/InputBox';
import Layout from '@/components/Layout';
import { ChangeEvent, SetStateAction, useState } from 'react';

const LoginPage = () => {
    const [usernameBorder, setUsernameBorder] = useState<SetStateAction<string>>('');
    const [usernameText, setUsernameText] = useState<string | number>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = (event.target as HTMLInputElement).value;
        setUsernameText(inputValue);
        const regex = /^[a-zA-Z0-9_]+$/;
        if (regex.test(inputValue)) {
            setUsernameBorder(' border-2 border-green-500');
        } else {
            setUsernameBorder(' border-2 border-red-500');
        }
    };
    return (
        <Layout title="Login | URL Shortener">
            <div className="flex flex-col w-screen items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    URL Shortener
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <InputBox
                                    type="text"
                                    name="Username"
                                    onChange={handleChange}
                                    value={usernameText}
                                    placeholder="John_Doe"
                                    className={`bg-gray-50  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${usernameBorder}`}
                                    required={true}
                                />
                            </div>
                            <div>
                                <InputBox
                                    type={'password'}
                                    name="Password"
                                    onChange={(e) => e}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required={true}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500">
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gray-200 hover:bg-gray-300 text-dark focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                Log in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{' '}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;
