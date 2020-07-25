import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import connectDatabase from './database';
import routes from './routes';
import NegocioError from './NegocioError';

const port = process.env.PORT || 3000;

const app = express();

connectDatabase();

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof NegocioError) {
        const { status, msgs } = err;
        return res.status(status).send({ msgs, timestamp: new Date() });
    }
    console.error(err);
    res.status(500);
    return res.render('error', { error: err });
});

app.listen(port, () => console.log(`Server started! Port: ${port}`));
