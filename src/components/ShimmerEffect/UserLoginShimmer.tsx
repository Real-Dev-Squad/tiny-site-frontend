const UserLoginShimmer = () => {
    return (
        <div className="flex items-center space-x-2 animate-pulse" data-testid="user-login-shimmer">
            <div className="w-[46px] h-[46px] rounded-[50%] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center text-white text-lg p-4"></div>
            <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 h-5 w-20 inline-block"></span>
        </div>
    );
};

export default UserLoginShimmer;
