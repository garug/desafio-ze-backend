import 'reflect-metadata';
import './container';

import express, { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import routes from './routes';
import NegocioError from './errors/NegocioError';
import IDatabase from './infra/database/IDatabase';

const port = process.env.PORT || 3000;

const database = container.resolve<IDatabase>('Database');

const app = express();

database.connect();

app.use(routes);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof NegocioError) {
        const { status, msgs } = err;
        return res.status(status).send({ msgs, timestamp: new Date() });
    }
    console.error(err);
    res.status(500);
    return res.json({ msgs: [err.message], error: err });
});

app.listen(port, () => console.log(`Server started! Port: ${port}`));
