import { Router } from 'express';

const partnerController = Router();

partnerController
    .route('/partner')
    .post((req, res) => {
        console.log(req, res);
    })
    .get((req, res) => {
        res.send({ msg: 'Hello gordin' });
    });

export default partnerController;
