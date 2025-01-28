import orderrepositery from "./order.repositery.js";

export default class ordercontroller {
    constructor() {
        this.orderrepositery = new orderrepositery();
    }

    async placeorder(req, res) {
        try {
            let userid = req.userID;
            let error = await this.orderrepositery.placeorder(userid);
            if (error) {
                return res.status(400).send("Some things went wrong");
            }
            res.status(200).send("Order placed successfully");
        } catch (error) {
            console.log(error);
            return res.status(400).send("Something went wrong");
        }
    }
}