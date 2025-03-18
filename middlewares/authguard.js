import { SECRET } from '../config/db.config.js';
import jsonwebtoken from 'jsonwebtoken';
//import jwt_decode from 'jwt-decode';
const authClientToken = (req,res,next) => {
    //console.log("abcd",req.headers)
    let token = req.headers['authorization'];
    console.log('4444',token)
    if (token){
        // Remove Bearer from string
        token = token.slice(7);
        jsonwebtoken.verify(token,SECRET , (err,decoded) => {
            if(err){
                return res.status(401).json({
                    "errors" : [{
                        "msg" : "Token expired. Please login again"
                    }]
                });
            }
            //req.adminInfo = jwt_decode(token, SECRET);
            return next();
        });
    } else {
        return res.status(401).json({
            "errors" : [{
                "msg" : " No token provided"
            }]
        });
    }
}
export const checkAuthToken = authClientToken;