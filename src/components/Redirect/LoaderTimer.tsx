import RedirectIcon from '../../../public/assets/icons/redirect';

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
    } else {
        return (
            <>
                <div className="loader border-t-4 rounded-full border-gray-500 animate-spin aspect-square w-20 flex justify-center items-center text-yellow-700 text-4xl font-bold mt-4">
                    {timer}
                </div>
                <button onClick={goButtonClickHandler} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
                    Go
                </button>
            </>
        );
    }
};

export default LoaderTimer;
