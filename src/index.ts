import 'reflect-metadata';

import express from 'express';

import connectDatabase from './database';
import routes from './routes';

const port = process.env.PORT || 3000;

const app = express();

connectDatabase();

app.use(routes);

app.listen(port, () => console.log(`Server started! Port: ${port}`));
