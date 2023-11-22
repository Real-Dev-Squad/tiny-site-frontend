import { urlHandler } from './handlers/url';
import { userHandler } from './handlers/user';

const handlers = [...userHandler, ...urlHandler];
export default handlers;
