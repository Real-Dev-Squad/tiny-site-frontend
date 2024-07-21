import { deleteUrlHandler, getAllUrlHandler, getOriginalUrlHandler, shortenUrlHandler } from './handlers/url';
import { getSelfUserHandler } from './handlers/user';

const handlers = [
    ...deleteUrlHandler,
    ...getSelfUserHandler,
    ...getAllUrlHandler,
    ...getOriginalUrlHandler,
    ...shortenUrlHandler,
];
export default handlers;
