
import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
import bcrypt from 'bcrypt';

export default class usermodel {
    constructor(name, email, password, type) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        
        
    }

    static getalluser() {
        return users;
    }

    static async getbyemail(email) {
        try {
            const db = getdb();
            const collection = db.collection("users");
            let user = await collection.findOne({ "email": email });
            return user;
        } catch (error) {
            throw new Error("Something went wrong");
        }
    }

    static async signup(user) {
        try {
            const db = getdb();
            const collection = db.collection("users");
            await collection.insertOne(user);
            return user;
        } catch (error) {
            throw new Error("Something went wrong");
        }
    }

    static async login(email, password) {
        try {
            let user1 = await this.getbyemail(email);
            if (!user1) {
                return null;
            } else {
                const result = await bcrypt.compare(password, user1.password);
                return result;
            }
        } catch (error) {
            return null;
        }
    }
}

let users = [
    {
        id: 1,
        name: "suhail",
        email: "suhail@gmail.com",
        password: "1234",
        type: "seller"
    }
];
