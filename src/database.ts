import mongoose from 'mongoose';

const uri =
    'mongodb+srv://ze-user:W5w7Wy4g9qcSna@cluster0-jjz8t.gcp.mongodb.net/ze?retryWrites=true&w=majority';

export default (): void => {
    const connect = () => {
        console.log('Connecting to database...');
        mongoose
            .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                return console.log('Database Connected!');
            })
            .catch(error => {
                console.log('Error connecting to database: ', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected', connect);
};
