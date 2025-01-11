import express from 'express';
import cartcontroller from './cart.controller.js';
// 2. Initialize Express router.
const cartRouter = express.Router();

cartRouter.post('/', cartcontroller.add);
cartRouter.get('/',cartcontroller.getitem);
cartRouter.delete('/:id',cartcontroller.delete)
export default cartRouter;