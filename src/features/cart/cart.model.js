import { getdb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
export default class cartmodel {
    constructor(productID, userID, quantity,id) {
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this._id=id;
        
    }
    static async add(productID, userID, quantity) {
        try {
            let cartItem = new cartmodel(productID, userID, quantity);
            const db = getdb();
            const result = await db.collection("cart");
            // result.insertOne(cartItem);
            // return true;

            await result.updateOne(
                {productID:productID,userID:userID},
                {
                    $inc:{quantity:quantity}
                },
                {upsert:true}
            )
           return true;

        } catch (err) {
            console.log(err);
        }
    }
    static async getitem(userID) {
        try {
            
            const db = getdb();
            const result = await db.collection("cart");
            const items=await result.find({userID:userID}).toArray();
            if(items.length==0){
                return null;
            }
            return items;


        } catch (err) {
            console.log(err);
        }
    }
    static async delete(cartItemID, userID) {
        try {
            const db = getdb();
            const result = await db.collection("cart");
            
            await result.deleteOne({ _id: new ObjectId(cartItemID), userID: userID });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
var cartItems = [];