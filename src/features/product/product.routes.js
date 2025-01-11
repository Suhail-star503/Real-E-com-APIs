import express from 'express';
import uploads from '../../middleware/middleware.js';
import productcontroller from './product.controller.js';
let productrouter=express.Router();
productrouter.get('/',productcontroller.getallproduct);
productrouter.post('/',uploads.single('img'),productcontroller.addproduct);
productrouter.post('/filter',productcontroller.filterproduct);
productrouter.post('/rate',productcontroller.rateproduct)
productrouter.get('/:id',productcontroller.getoneproduct);


export default productrouter;