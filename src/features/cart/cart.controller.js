import cartmodel from './cart.model.js';
import { getdb } from '../../config/mongodb.js';
export default class cartcontroller {
    static async add(req, res) {
        const userId = req.userID;
        const { productId, quantity } = req.body; // Ensure productId is correctly named
         
        if (!productId || !quantity) {
            return res.status(400).send("Product ID and quantity are required");
        }

        const result = await cartmodel.add(productId, userId, quantity);
        if (result) {
            return res.status(201).send("Item added to cart");
        } else {
            return res.status(404).send("Item not added to cart");
        }
    }
    static async getitem(req, res) {
        const userID = req.userID;
        const items = await cartmodel.getitem(userID);
        if(items.length==0 || !items){
            return res.status(404).send("No items found in cart");
        }
        return res.status(200).send(items);
    }
    static async delete(req, res) {
        const userID = req.userID;
        const cartItemID = req.params.id;
        
        const result = await cartmodel.delete(cartItemID, userID);
        if (result) {
            return res.status(201).send("Cart Item is removed");
        } else {
            return res.status(404).send("Cart item not found");
        }
    }

}