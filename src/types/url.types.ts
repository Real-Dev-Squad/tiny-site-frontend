export interface UrlType {
    Id: number;
    OriginalUrl: string;
    ShortUrl: string;
    Comment: string;
    UserId: number;
    ExpiredAt: string;
    CreatedAt: string;
    CreatedBy: string;
}

export interface UrlResponseTypes {
    message: string;
    url: UrlType;
}

export interface UrlListResponseTypes {
    message: string;
    urls?: UrlType[];
}
