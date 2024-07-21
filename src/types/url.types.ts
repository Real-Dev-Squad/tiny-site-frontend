export interface UrlType {
    id: number;
    originalUrl: string;
    shortUrl: string;
    comment: string;
    userId: number;
    expiredAt: string;
    createdAt: string;
    createdBy: string;
}

export interface UrlResponseTypes {
    message: string;
    url: UrlType;
}

export interface ErrorResponse {
    response: {
        data: {
            message: string;
        };
    };
}
