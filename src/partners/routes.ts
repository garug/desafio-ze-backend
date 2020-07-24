import { Router } from 'express';

import partnerController from './controllers/PartnerController';

const partnerRoutes = Router();

partnerRoutes.use(partnerController);

export default partnerRoutes;
