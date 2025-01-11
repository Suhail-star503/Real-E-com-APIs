import usermodel from "../user/user.model.js";
export default class productmodel {
    constructor(id, name, prize, img, description) {
        this.id = id;
        this.name = name;
        this.prize = prize;
        this.img = img;
        this.description = description;
    }
    static getall() {
        return products;
    }
    static getone(id) {
        
        return products.find(p => p.id == id);
    }
    static addproduct(product) {
        products.push(product);

    }
    static filterproduct(minprize, maxprize) {
        let result = products.filter(p => p.prize >= minprize && p.prize <= maxprize);
        return result;
    }
    static rateproduct(userID, productID, rating) {
        const user = usermodel.getalluser().find(
            (u) => u.id == userID
        );
        if (!user) {
            return 'User not found';
        }
        // Validate Product
        const product = products.find(
            (p) => p.id == productID
        );
        if (!product) {
            return 'Product not found';
        }
        // 2. Check if there are any ratings and if not then add ratings
        
            if(!product.ratings) {
            product.ratings = [];
            product.ratings.push({
                userID: userID,
                rating: rating,
            });
        } else {
            // 3. check if user rating is already available.
            const existingRatingIndex = product.ratings.findIndex(
                (r) => r.userID == userID
            );
            if (existingRatingIndex >= 0) {
                product.ratings[existingRatingIndex] = {
                    userID: userID,
                    rating: rating,
                };
            } else {
                // 4. if no existing rating, then add new rating.
                product.ratings.push({
                    userID: userID,
                    rating: rating,
                });
            }
        }
    }

}


var products = [
    new productmodel(1, 'Shirt', 200, 'https://m.media-amazon.com/images/I/81hjyJJ6lpL._AC_SY445_.jpg', 'This is the shirt for man'),
    new productmodel(2, 'Pant', 300, 'https://m.media-amazon.com/images/I/71n4aYYXM-L._AC_SY445_.jpg', 'this is the pant for man'),
    new productmodel(3, 'Shoes', 400, 'https://m.media-amazon.com/images/I/711lA5rk08L._AC_SY395_.jpg', 'This is the shoes for man'),
    new productmodel(4, 'watch', 500, 'https://m.media-amazon.com/images/I/71kzslUzjHL._AC_SY500_.jpg', 'This is the watch for man'),
    new productmodel(5, 'Belt', 200, 'https://m.media-amazon.com/images/I/81inmnspZML._AC_SY445_.jpg', "this is the belt for man")
]