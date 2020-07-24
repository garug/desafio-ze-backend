import express, { Router } from 'express';

import partnerRoutes from './partners/routes';

const routes = Router();

routes.use(express.json());
routes.use(partnerRoutes);

export default routes;
