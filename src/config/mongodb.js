
import { MongoClient } from "mongodb";
// import env from 'dotenv';
// env.config();

let client;
const connectToMongoDB = () => {
    MongoClient.connect(process.env.DB_HOST)
        .then(clients => {
            console.log("Mongodb is connected");
            client = clients;
            createIndex();
        })
        .catch(err => {
            console.log(err);
        })
}
export const getdb = () => {
    return client.db('ecomdb');
}
export const createIndex = async () => {
    try {
        const db = getdb();
        const result = await db.collection('cart').createIndex({
            quantity
                : 1
        });
        console.log('Index created:', result);
    } catch (err) {
        console.error('Error creating index:', err);
    }
};
export default connectToMongoDB;

