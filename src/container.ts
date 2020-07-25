import { container } from 'tsyringe';

import IDatabase from './IDatabase';
import MongoDatabase from './infra/database/mongodb/database';
import IPartnerRepository from './partners/repositories/IPartnerRepository';
import PartnerRepository from './infra/database/mongodb/repositories/PartnerRepository';

container.registerSingleton<IDatabase>('Database', MongoDatabase);
container.registerSingleton<IPartnerRepository>(
    'PartnerRepository',
    PartnerRepository,
);
