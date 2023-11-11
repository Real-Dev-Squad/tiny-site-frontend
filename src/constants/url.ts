const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://staging-tinysite-api.realdevsquad.com/v1';
export const TINY_SITE = process.env.NEXT_PUBLIC_TINY_SITE || 'https://staging-tinysite.realdevsquad.com';

export const TINY_API_URL = API_BASE_URL;
export const TINY_API_GOOGLE_LOGIN = `${API_BASE_URL}/auth/google/login`;
export const TINY_API_LOGOUT = `${API_BASE_URL}/auth/logout`;
export const TINY_API_URL_DETAIL = `${TINY_API_URL}/urls`;
export const TINY_API_REDIRECT = `${TINY_API_URL}/tinyurl`;
