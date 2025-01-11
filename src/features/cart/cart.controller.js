import cartmodel from './cart.model.js';
export default class cartcontroller {
    static add(req, res) {
        const { productID, quantity } = req.query;
        const userID = req.userID;
        cartmodel.add(productID, userID, quantity);
        res.status(201).send('Cart is updated');
    }
    static getitem(req, res) {
        const userID = req.userID;
        const items = cartmodel.getitem(userID);
        return res.status(200).send(items);
    }
    static delete(req, res) {
        const userID = req.userID;
        const cartItemID = req.params.id;
        const error = cartmodel.delete(
            cartItemID,
            userID
        );
        if (error) {
            return res.status(404).send(error);
        }else{
         return res
            .status(200)
            .send('Cart Item is removed');
        }
    }    

}