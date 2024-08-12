import { ReactNode } from 'react';

type DashboardLayoutProps = {
    remainingUrls?: number;
    children: ReactNode;
};

const MAX_URLS = 50;

export const DashboardLayout = ({ remainingUrls, children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen px-4">
            <div className="w-full flex flex-col justify-center items-center max-w-3xl mx-auto">
                <div className="flex items-center py-8 w-full justify-between">
                    <h1 className="text-3xl md:text-4xl xl:text-4xl text-center text-white font-semibold">Your URLs</h1>

                    {remainingUrls !== undefined && (
                        <h4 className="text-white">
                            Remaining: {remainingUrls} / {MAX_URLS}
                        </h4>
                    )}
                </div>

                {children}
            </div>
        </div>
    );
};
