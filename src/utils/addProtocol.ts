export const addProtocol = (url: string) => {
    if (url.match(/^(https?:\/\/)/)) {
        return url;
    }
    return `http://${url}`;
};
