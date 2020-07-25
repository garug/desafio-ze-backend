import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/ze';

export default (): void => {
    const connect = () => {
        console.log('Connecting to database...');
        mongoose
            .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Database Connected!'))
            .catch(error => {
                console.log('Error connecting to database: ', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
