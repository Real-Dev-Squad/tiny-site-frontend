import { rest } from 'msw';

import { TINY_API_URL } from '@/constants/url';

import userData from '../db/user';

const getSelfUserHandler = [
    rest.get(`${TINY_API_URL}/users/self`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(userData));
    }),
];

const unauthorizedUserHandler = [
    rest.get(`${TINY_API_URL}/users/self`, (req, res, ctx) => {
        return res(ctx.status(401));
    }),
];

export { getSelfUserHandler, unauthorizedUserHandler };
