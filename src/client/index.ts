import { Router } from 'express';

import auth from './auth';
import problem from './problems';
import submit from './submit';

const client = Router();

client.use('/auth', auth);
client.use('/problem', problem);
client.use('/submit', submit);

export default client;
