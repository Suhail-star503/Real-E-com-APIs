import express from 'express';
import productrouter from './src/features/product/product.routes.js';
import bodyParser from 'body-parser';
import cartRouter from './src/features/cart/cart.routes.js'
import userrouter from './src/features/user/userroutes.js'
import jwtAuth from './src/middleware/auth.js';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';
import loggerMiddleware from './src/middleware/log.middle.js'
import apiDocs from './src/middleware/swagger.json' with { type: "json" };



let server = express();
server.get('/', (req, res) => {
    return res.send('hello from server')
})
server.use(bodyParser.json());
server.use(loggerMiddleware);

server.use(cookieParser());

server.use('/api/product', jwtAuth, productrouter)
server.use('/api/cart', jwtAuth, cartRouter)
server.use('/api/user', userrouter);
server.use(
    '/api-docs',
    swagger.serve,
    swagger.setup(apiDocs)
);
server.use((err, req, res, next) => {

    res
        .status(500)
        .send(
            'Something went wrong, please try later'
        );
});

server.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation on http://localhost:3000/api-docs")
})

server.listen(3000, () => {
    console.log('server is listing on 3000 port')
})
