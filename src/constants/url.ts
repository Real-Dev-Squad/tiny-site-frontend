const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://staging-tinysite-api.realdevsquad.com/v1';
export const BASE_SHORT_URL = process.env.NEXT_PUBLIC_BASE_SHORT_URL || 'https://staging-tinysite.realdevsquad.com';

export const TINY_API_URL = API_BASE_URL;
export const TINY_API_GOOGLE_LOGIN = `${API_BASE_URL}/auth/google/login`;
export const TINY_API_LOGOUT = `${API_BASE_URL}/auth/logout`;
