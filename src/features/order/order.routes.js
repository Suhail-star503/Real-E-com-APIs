import express from 'express';
import ordercontroller from './order.controller.js';

let orderrouter = express.Router();
let controller = new ordercontroller();
orderrouter.post('/placeorder', controller.placeorder.bind(controller)); // Bind the context of the controller
export default orderrouter;