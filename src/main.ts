import express from 'express';
import logger from './utils/logging';
import morgan from 'morgan';

import views from './views';
import client from './client';

const PORT = process.env.PORT || 80;

logger.info('Starting server...');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(
	morgan(
		'":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
		{
			stream: { write: (msg) => logger.info(msg.slice(0, -1)) },
		}
	)
);
app.use(express.static('public'));

app.use('/', views);
app.use('/', client);

app.listen(PORT, () => {
	logger.info(`Server started on port ${PORT}`);
});
