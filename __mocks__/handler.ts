import { getAllUrlHandler } from './handlers/url';
import { getSelfUserHandler } from './handlers/user';

const handlers = [...getSelfUserHandler, ...getAllUrlHandler];
export default handlers;
