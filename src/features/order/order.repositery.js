import { getdb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import ordermodel from "./order.model.js";

export default class orderrepositery {
    async placeorder(userid) {
        
        try{
             //get the cart items of the user and get total amount
            let data=await this.gettotallamount(userid);
            if(data.length==0){
                return null;
            }
            let total=data.reduce((sum,item)=>sum+item.total,0);
            
            //create order instent and insert into order collection
            let order=new ordermodel(userid,total,new Date());
            let db=getdb();
            let collection=db.collection("orders");
            await collection.insertOne(order);
            //reduce the product stock in the product collection
            let productcollection=db.collection("products");
            data.forEach(async item=>{
                await productcollection.updateOne({_id:new ObjectId(item.productID)},{$inc:{Stock:-item.quantity}});
            })
            //delete the cart items of the user
            let cartcollection=db.collection("cart");
            await cartcollection.deleteMany({userID:userid});

            
            
        }catch(err){
            console.log(err);
        }
        

    }
     
    async gettotallamount(userid) {
        let db = getdb();
        let data = await db.collection("cart").aggregate([
            {
                $match: {
                    userID: userid // Assuming userID is stored as a string
                }
            },
            {
                $addFields: {
                    productID: { $toObjectId: "$productID" } // Convert productID to ObjectId
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productdetails"
                }
            },
            {
                $unwind: "$productdetails"
            },
            {
                $addFields: {
                    total: { $multiply: ["$productdetails.prize", "$quantity"] } // Ensure the field name is correct
                }
            }
        ]).toArray();
        return data;
        

        
    }

    
}