const Footer: React.FC = () => {
    return (
        <div className="bg-gray-900 flex justify-center items-center h-[6vh]">
            <p className="text-gray-200 text-sm text-center">
                The contents of this website are deployed from this{' '}
                <a
                    href="https://github.com/Real-Dev-Squad/tiny-site-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                >
                    open sourced repo
                </a>
            </p>
        </div>
    );
};

export default Footer;
