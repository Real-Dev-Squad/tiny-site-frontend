export interface User {
    message: string,
    data: {
        id: number;
        userName: string;
        email?: string;
        password?: string;
        isVerified?: boolean;
        isOnboarding?: boolean;
        createdAt?: string;
        updatedAt?: string;
    }
}
