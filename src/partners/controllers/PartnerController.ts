import { Router } from 'express';
import { container } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';

import CreatePartner from '../services/CreatePartner';
import FindPartner from '../services/FindPartner';
import IPartner from '../entities/IPartner';

const partnerController = Router();
const createPartner = container.resolve(CreatePartner);
const findPartner = container.resolve(FindPartner);

partnerController.post('/', async (req, res, next) => {
    try {
        const newPartner: IPartner = { ...req.body };
        const savedPartner = await createPartner.execute(newPartner);
        return res
            .status(201)
            .location(`${req.originalUrl}/${savedPartner.id}`)
            .send(savedPartner);
    } catch (err) {
        return next(err);
    }
});

partnerController.get('/', async (req, res, next) => {
    const { lat, long } = req.query;
    const point: Point = {
        type: 'Point',
        coordinates: [Number(lat), Number(long)],
    };
    try {
        const nearestPartner = await findPartner.nearest(point);
        return res.send(nearestPartner);
    } catch (err) {
        return next(err);
    }
});

partnerController.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const savedPartner = await findPartner.byId(id);
        if (savedPartner) {
            return res.send(savedPartner);
        }
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
});

export default partnerController;
