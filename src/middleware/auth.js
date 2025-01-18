// import jwt from 'jsonwebtoken';
// import env from 'dotenv';
// env.config();
// const jwtAuth = (req, res, next) => {
//     // 1. Read the token.
//     const token = req.headers['authorization'];

//     // console.log(token);
//     // 2. if no token, return the error.
//     if (!token) {
//         return res.status(401).send('Unauthorized');
//     }
//     // 3. check if token is valid.
//     try {
//         const payload = jwt.verify(
//             token,
//             process.env.SECRET_KEY
//         );
//         // console.log(payload);
//         req.userID=payload.userID;
//         next();
//     } catch (err) {
//         // 4. return error.
//         // console.log(err);
//         return res.status(401).send('Unauthorized');
//     }
    
    
// };
// export default jwtAuth;

import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log(`Token received: ${token}`);  // Debugging

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_KEY
        );
        console.log(`Payload: ${JSON.stringify(payload)}`);  // Debugging
        req.userID = payload.userID;
        next();
    } catch (err) {
        console.error(err);  // Debugging
        return res.status(401).send('Unauthorized');
    }
};

export default jwtAuth;
