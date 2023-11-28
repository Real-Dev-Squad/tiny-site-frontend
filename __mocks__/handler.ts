import { getAllUrlHandler, getOriginalUrlHandler, shortenUrlHandler } from './handlers/url';
import { getSelfUserHandler } from './handlers/user';

const handlers = [...getSelfUserHandler, ...getAllUrlHandler, ...getOriginalUrlHandler, ...shortenUrlHandler];
export default handlers;
