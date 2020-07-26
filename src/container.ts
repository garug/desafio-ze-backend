import { container } from 'tsyringe';

import IDatabase from './infra/database/IDatabase';
import MongoDatabase from './infra/database/mongodb/MongoDatabase';
import IPartnerRepository from './partners/repositories/IPartnerRepository';
import PartnerRepository from './infra/database/mongodb/repositories/PartnerRepository';

container.registerSingleton<IDatabase>('Database', MongoDatabase);
container.registerSingleton<IPartnerRepository>(
    'PartnerRepository',
    PartnerRepository,
);
