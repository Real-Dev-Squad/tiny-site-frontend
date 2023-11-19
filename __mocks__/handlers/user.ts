import { http, HttpResponse } from 'msw';

import { TINY_API_URL } from '@/constants/url';

import userData from '../db/user';

const userHandler = [
    http.get(`${TINY_API_URL}/users/self`, () => {
        return HttpResponse.json(userData);
    }),
];

export default userHandler;
