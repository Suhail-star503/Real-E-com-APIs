// import env from 'dotenv';
// env.config();
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import userrepository from "./user.mongoos.repository.js";

export default class usercontroller {
    static async signup(req, res) {
        try {
            const { name, email, password, type } = req.body;
            const hashpass = await bcrypt.hash(password, 12);
            
            let newuser = { name, email, password: hashpass, type };
            let user1 = await userrepository.signup(newuser);
            return res.status(201).send(user1);
        } catch (error) {
            return res.status(500).send("Error signing up user");
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userrepository.getbyemail1(email);
            if (!user) {
                return res.status(400).send("User not found");
            }
            const result = await userrepository.login(email, password);
            if (!result) {
                return res.status(401).send("Incorrect password");
            } else {
                const token = jwt.sign(
                    {
                        userID: user._id,
                        email: user.email,
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '1h',
                    }
                );
                return res.status(200).send({ message: 'Login successful', token });
            }
        } catch (error) {
            return res.status(500).send("Error logging in user");
        }
    }
    
}