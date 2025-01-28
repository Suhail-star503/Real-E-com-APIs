
import productmodel from "./productmodel.js";

export default class productcontroller {
  static async getallproduct(req, res) {
    try {
      let products = await productmodel.getall();
      res.status(200).json(products); // You can use .json() which internally handles JSON conversion
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  }

  static async addproduct(req, res) {
    const { name, prize, description } = req.body;
    const img = req.file.filename;

    let product1 = new productmodel(name, parseFloat(prize), img, description);
    const product = await productmodel.addproduct(product1);

    return res.status(201).send(product);
  }

  static async getoneproduct(req, res) {
    try {
      const id = req.params.id;

      let product = await productmodel.get(id);

      if (product) {

        return res.status(200).json(product);
      } else {
        return res.status(400).send("Product not found");
      }
    } catch (error) {

      return res.status(500).send("Something went wrong");
    }
  }

  static async filterproduct(req, res) {
    try {
      const minprize = parseInt(req.query.minprize);
      const maxprize = parseInt(req.query.maxprize);
      let products = await productmodel.filterproduct(minprize, maxprize);

      if (!products || products.length === 0) {
        return res.status(400).send("Product not found");
      }
      return res.status(200).send(products);
    }
    catch (error) {
      console.log(error);
    }
  }

  static async rateproduct(req, res) {
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    const error = await productmodel.rateproduct(
      userID,
      productID,
      rating
    );
    if (error) {
      return res.status(200).send(error);
    } else {
      return res.status(400).send("something went wrong");
    }
  }






}
