import { rest } from 'msw';

import { TINY_API_URL } from '@/constants/url';

import { urlDetails, urls } from '../db/urls';

const getAllUrlHandler = [
    rest.get(`${TINY_API_URL}/urls/self`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(urls));
    }),
];

const notFoundAllUrlHandler = rest.get(`${TINY_API_URL}/urls/self`, (_, res, ctx) => {
    return res(
        ctx.status(404),
        ctx.json({
            message: 'Urls not found',
        })
    );
});

const getOriginalUrlHandler = [
    rest.get(`${TINY_API_URL}/urls/963d9c42`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(urlDetails));
    }),
];

const notFoundOriginalUrlHandler = rest.get(`${TINY_API_URL}/urls/963d9c4s`, (_, res, ctx) => {
    return res(
        ctx.status(404),
        ctx.json({
            message: 'No URLs found',
        })
    );
});

const shortenUrlHandler = [
    rest.post(`${TINY_API_URL}/tinyurl`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ shortUrl: urlDetails.url.shortUrl }));
    }),
];

const deleteUrlHandler = [
    rest.delete(`${TINY_API_URL}/urls/:id`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ success: true }));
    }),
];

export {
    deleteUrlHandler,
    getAllUrlHandler,
    getOriginalUrlHandler,
    notFoundAllUrlHandler,
    notFoundOriginalUrlHandler,
    shortenUrlHandler,
};
