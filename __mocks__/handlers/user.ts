import { rest } from 'msw';

import { TINY_API_URL } from '@/constants/url';

import userData from '../db/user';

const userHandler = [
    rest.get(`${TINY_API_URL}/users/self`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(userData));
    }),
];

export default userHandler;
