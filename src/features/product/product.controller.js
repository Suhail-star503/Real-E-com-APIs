import productmodel from "./productmodel.js";


export default class productcontroller {
  static getallproduct(req, res) {
    let products = productmodel.getall();
    res.status(200).send(products);
  }
  static addproduct(req, res) {
    const { name, prize, description } = req.body;
    const img = req.file.filename;
    const id = productmodel.getall().length + 1;
    let product = new productmodel(id, name, prize, img, description);
    productmodel.addproduct(product);
    let products = productmodel.getall();

    return res.status(201).send(products);

  }
  static getoneproduct(req, res) {
    const id = req.params.id;
    let product = productmodel.getone(id);
    if (product) {
      return res.status(200).send(product);
    }
    else {
      return res.status(401).send('product not found');
      
    }

  }

  static filterproduct(req, res) {
    const minprize = parseInt(req.query.minprize);
    const maxprize = parseInt(req.query.maxprize);
    let products = productmodel.filterproduct(minprize, maxprize);
    return res.status(200).send(products);
  }
  static rateproduct(req, res) {
    
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    const error = productmodel.rateproduct(
      userID,
      productID,
      rating
    );
    if (error) {
      return res.status(401).send(error);
    } else {
      return res.status(200).send("Rated succesfully");
    }
  }
}