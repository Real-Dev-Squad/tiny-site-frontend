import { getAllUrlHandler, getOriginalUrlHandler } from './handlers/url';
import { getSelfUserHandler } from './handlers/user';

const handlers = [...getSelfUserHandler, ...getAllUrlHandler, ...getOriginalUrlHandler];
export default handlers;
