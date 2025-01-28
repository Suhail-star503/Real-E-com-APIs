
import usermodel from "../user/user.model.js";
import { getdb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class productmodel {
    constructor(name, prize, img, description) {

        this.name = name;
        this.prize = prize;
        this.img = img;
        this.description = description;
    }

    static async getall() {
        try {
            const db = getdb();
            const collection = db.collection("products");
            let products = await collection.find().toArray(); // Convert cursor to an array
            return products;
        } catch (error) {
            throw new Error("Something went wrong");
        }
    }

    static async get(id) {
        try {
            const db = getdb();
            const collection = db.collection("products");
            let product = await collection.findOne({ _id: new ObjectId(id) }); // Use 'new' keyword
            return product;
        } catch (error) {
            return null;
        }
    }

    static async addproduct(product) {
        try {
            const db = getdb();
            const collection = db.collection("products");
            await collection.insertOne(product);
            return product;
        } catch (error) {
            throw new Error("Something went wrong");
        }
    }

    static async filterproduct(minprize, maxprize) {
        try {
            const db = getdb();
            const collection = db.collection("products");
            let products = await collection.find({
                prize: { $gte: minprize, $lte: maxprize }
            }).toArray();
            return products;
        } catch (error) {
            return null;
        }
    }
    

    static async rateproduct(userID, productID, rating) {
        try {
            const db = getdb();
            const collection = db.collection("users");
            let user = await collection.findOne({
                _id: new ObjectId(userID)
            });
            if (!user) {
                return 'User not found';
            }

            const collection1 = db.collection("products");
            let product = await collection1.findOne({
                _id: new ObjectId(productID)
            });
            if (!product) {
                return 'Product not found';
            }

            if (!product.ratings) {
                product.ratings = [];
            }
            


            
            const existingRatingIndex = product.ratings.findIndex(
                (r) => r.userID == userID
            );

            if (existingRatingIndex >= 0) {
                // If a rating from the same user exists, update it
                await collection1.updateOne(
                    { _id: new ObjectId(productID), "ratings.userID": userID },
                    { $set: { "ratings.$.rating": rating } }



                );
            } else {
                // If no existing rating, then add new rating
                await collection1.updateOne(
                    { _id: new ObjectId(productID) },
                    { $push: { ratings: { userID, rating } } }
                );
            }

            return 'Rating updated successfully';

        } catch (error) {
            console.error(error);
            return 'Internal Server Error';
        }
    }



    
    
    
    
    

}


var products = [
    new productmodel("Shirt", 200, 'https://m.media-amazon.com/images/I/81hjyJJ6lpL._AC_SY445_.jpg', 'This is the shirt for man', new ObjectId()),
    new productmodel("Pant", 300, 'https://m.media-amazon.com/images/I/71n4aYYXM-L._AC_SY445_.jpg', 'this is the pant for man', new ObjectId()),
    new productmodel("Shoes", 400, 'https://m.media-amazon.com/images/I/711lA5rk08L._AC_SY395_.jpg', 'This is the shoes for man', new ObjectId()),
    new productmodel("watch", 500, 'https://m.media-amazon.com/images/I/71kzslUzjHL._AC_SY500_.jpg', 'This is the watch for man', new ObjectId()),
    new productmodel("Belt", 200, 'https://m.media-amazon.com/images/I/81inmnspZML._AC_SY445_.jpg', "this is the belt for man", new ObjectId())
];
