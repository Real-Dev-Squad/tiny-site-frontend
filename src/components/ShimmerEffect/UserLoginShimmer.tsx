const UserLoginShimmer = () => {
    return (
        <div className="flex items-center space-x-2 animate-pulse" data-testid="user-login-shimmer">
            <div className="w-[46px] h-[46px] rounded-[50%] bg-gradient-to-r from-[#384B6B] via-[#526E8E] to-[#384B6B] flex items-center justify-center text-white text-lg p-4"></div>
            <span className="bg-gradient-to-r from-[#526E8E] via-[#384B6B] to-[#526E8E] h-5 w-20 inline-block"></span>
        </div>
    );
};

export default UserLoginShimmer;
