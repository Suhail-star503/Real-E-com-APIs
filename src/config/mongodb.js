// import env from 'dotenv';
// env.config();
// import { MongoClient } from "mongodb";
// const url = process.env.DB_HOST;
// let client;
// const connectToMongoDB = () => {
//     MongoClient.connect(url)
//         .then(clients => {
//             console.log("Mongodb is connected");
//             client=clients
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }
// export const getdb=()=>{
//   return client.db('ecomdb');
// }
// export default connectToMongoDB;

import env from 'dotenv';
env.config();
import { MongoClient } from "mongodb";

const url = process.env.DB_HOST;
let client;

const connectToMongoDB = async () => {
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Mongodb is connected");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
};

export const getdb = () => {
    if (!client) {
        throw new Error("Database not connected");
    }
    return client.db('ecomdb');
};

export default connectToMongoDB;
