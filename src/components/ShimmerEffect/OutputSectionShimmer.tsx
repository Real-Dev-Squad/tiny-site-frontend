const OutputSectionShimmer = () => {
    return (
        <div
            className="flex flex-col justify-center items-center m-4 lg:w-[52rem] md:w-[42rem] sm:w-[22rem] w-[18rem]"
            data-testid="output-section-shimmer"
        >
            <section className="flex flex-col justify-between items-center rounded-2xl mt-5 sm:mt-10 w-[100%] text-gray-400">
                <div className="animate-pulse bg-gray-800 h-6 w-2/3 rounded mb-2"></div>
                <span className="animate-pulse bg-gray-800 h-8 w-4/5 rounded mb-2"></span>
                <div className="animate-pulse h-16 w-16 text-gray-800 mb-2"> </div>
                <div className="animate-pulse bg-gray-800 h-12 w-2/3 rounded mb-2"></div>
                <div className="flex flex-col md:flex-row justify-center items-center rounded-2xl w-full lg:w-[80%] xl:w-[80%] cursor-pointer bg-gray-800 p-2">
                    <span className="animate-pulse bg-gray-800 h-8 w-4/5 rounded mb-2"></span>
                    <div className="flex w-full md:w-[20%] justify-center items-center space-x-2 rounded-2xl px-2">
                        <div className="animate-pulse bg-gray-800 h-12 w-4/5 rounded-l-2xl mb-2"></div>
                        <div className="animate-pulse bg-gray-800 h-12 w-1/5 rounded-r-2xl mb-2"></div>
                    </div>
                </div>
                <button className="animate-pulse bg-gray-800 h-12 w-2/3 rounded-full mt-4"></button>
            </section>
        </div>
    );
};

export default OutputSectionShimmer;
