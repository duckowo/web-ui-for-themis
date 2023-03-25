import { Router } from 'express';

import auth from './auth';
import problems from './problems';
import submits from './submits';

const client = Router();

client.use('/auth', auth);
client.use('/problem', problems);
client.use('/submit', submits);

export default client;
