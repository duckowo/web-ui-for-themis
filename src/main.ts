import express from 'express';
import logger from './utils/logging';

import views from './views';
import client from './client';

const PORT = process.env.PORT || 80;

logger.info('Starting server...');

const app = express();

app.set('views', './views'); // Views directory
app.set('view engine', 'pug'); // Rendering engine

app.use(express.static('public')); // Public directory

app.use('/', views);
app.use('/', client);

app.listen(PORT, () => {
	logger.info(`Server started on port ${PORT}`);
});
