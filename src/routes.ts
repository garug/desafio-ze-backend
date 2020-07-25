import express, { Router } from 'express';

import partnerRoutes from './partners/routes';

const routes = Router();

routes.use(express.json());
routes.use('/partners', partnerRoutes);

export default routes;
