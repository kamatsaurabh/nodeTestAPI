import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://killingmachine:graphql@telemedicine.pnc95.mongodb.net/?retryWrites=true&w=majority";

const connectDatabase = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'TestingAPI'
        })
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host} ${data.connection.port}`);
        }).catch((error) => console.log(`${error} did not connect`));
};

export default connectDatabase;