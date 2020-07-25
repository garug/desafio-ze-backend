import mongoose from 'mongoose';
import IDatabase from '../../../IDatabase';

const uri = 'mongodb://localhost:27017/ze';

export default class MongoDatabase implements IDatabase {
    connect(): void {
        console.log('Connecting to database...');
        mongoose
            .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Database Connected!'))
            .catch(error => {
                console.log('Error connecting to database: ', error);
                return process.exit(1);
            });
    }
}
