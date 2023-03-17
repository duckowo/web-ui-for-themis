import path from 'path';
import fs from 'fs';
import { Router } from 'express';
import { PROBLEMS_DIR } from '../utils/configs';

const problem = Router();

problem.get('/*', (req, res) => {
	const joinedPath = path.join(PROBLEMS_DIR, req.path);
	const getJson = req.query['json'];

	if (!fs.existsSync(joinedPath)) {
		if (getJson) res.json([]).end();
		else res.status(404).end();
	} else {
		try {
			const pathStat = fs.lstatSync(joinedPath);
			if (pathStat.isDirectory()) {
				const content = fs
					.readdirSync(joinedPath, { withFileTypes: true })
					.filter((e) => e.isDirectory() || e.isFile())
					.map((e) => ({
						name: e.name,
						type: e.isFile() ? 'file' : 'dir',
						path: path.join(req.path, e.name),
					}));
				if (getJson) {
					res.json(content);
				} else {
					res.render('dir-view', {
						title: path.basename(joinedPath),
						path: req.path,
						content,
					});
				}
			} else if (pathStat.isFile()) {
				const content = fs.readFileSync(joinedPath);
				res.write(content);
				res.end();
			} else {
				res.status(404).end();
			}
		} catch {
			res.status(500).end();
		}
	}
});

export default problem;
