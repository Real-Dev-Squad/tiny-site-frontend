import Button from '@/components/Button';

import RedirectIcon from '../icons/redirect';

interface LoaderTimerProps {
    timer: number;
    goButtonClickHandler: () => void;
}

const LoaderTimer = ({ timer, goButtonClickHandler }: LoaderTimerProps) => {
    if (timer < 1) {
        return (
            <div className="mt-4 flex flex-col items-center space-y-2">
                <RedirectIcon />
                <p className="text-1xl">Redirecting...</p>
            </div>
        );
    }
    return (
        <>
            <div
                className="loader border-t-4 rounded-full border-gray-500 animate-ping aspect-square w-20 flex justify-center items-center text-yellow-700 text-4xl font-bold m-14"
                data-testid="loader"
            >
                <span>{timer}</span>
            </div>
            <Button
                onClick={goButtonClickHandler}
                className="mt-4 p-2 px-8 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Go
            </Button>
        </>
    );
};

export default LoaderTimer;
