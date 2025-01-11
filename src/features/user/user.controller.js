import usermodel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class usercontroller {
    static signup(req, res) {
        
        const { name, email, password, type } = req.body;
        const id = usermodel.getalluser().length + 1;
        let user = new usermodel(id, name, email, password, type);
        usermodel.signup(user);
        let users = usermodel.getalluser();
        return res.status(201).send(users);

    }
    static login(req, res) {
        const { email, password } = req.body;
        let user = usermodel.login(email, password);
        if (user) {
            const token = jwt.sign(
                {
                    userID: user.id,
                    email: user.email,
                },
                'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                {
                    expiresIn: '1h',
                }
            );
            return res.status(200).send(token);

        }
        else {
            return res.status(400).send('user not found')
        }
    }
}

