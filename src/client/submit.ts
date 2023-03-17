import { Router } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from '../utils/logging';
import { createSubmit, getSubmitResultContent, getSubmits } from '../utils/submit';
import { parseToken } from '../utils/token';
import { getAccounts } from '../utils/accounts';

const submit = Router();

submit.post('/new/:id/:ext', cookieParser(), bodyParser.text(), (req, res) => {
	const token = req.cookies['token'];
	if (!token) {
		res.status(401).end();
	} else {
		const username = parseToken(token);
		if (!username) {
			res.status(401).end();
		} else {
			const acc = getAccounts().find((acc) => acc.username == username);

			if (!acc) {
				return res.status(401).end();
			} else {
				try {
					createSubmit(`[${username}][${req.params.id}].${req.params.ext}`, req.body);
					res.status(200).end();
				} catch (e) {
					logger.error(`Cannot create submission: `, e);
					return res.status(500).end();
				}
			}
		}
	}
});

submit.get('/get/:user', async (req, res) => {
	getSubmits(req.params.user)
		.then((submits) => res.json(submits).end())
		.catch(() => res.json([]).end());
});

submit.get('/view/:file', (req, res) => {
	try {
		res.write(getSubmitResultContent(req.params.file));
	} catch (e) {
		res.status(404);
	} finally {
		res.end();
	}
});

export default submit;
