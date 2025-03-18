import authModel from "../../models/auth-model.js"
import { compareSync,genSaltSync, hashSync } from "bcrypt";
import { SECRET } from '../../config/db.config.js'
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import jwt_decode from 'jwt-decode'
export const addregistrationform = async(req,res,next) => {
    try {
       const datas=req.body;
       console.log(datas)
       const textmodel = new authModel();
       const salt = genSaltSync(10);
       console.log('salt',salt)
       datas.Password=hashSync(datas.Password,salt);
       datas.ConformPassword=hashSync(datas.ConformPassword,salt);
        console.log(datas.Password);
        const check = await textmodel.checkusername(datas.firstName);
        
        if(check==''){
             
             const email = await textmodel.checkuseremail(datas.email);

             if(email==''){
             const addtest = await textmodel.addregistrationform(datas)
              
                return res.status(201).json({
                    "success" : [{
                        "msg" : "data added sucess"
                    }]
                });

             }else{
                return res.status(400).json({
                    "errors" : [{
                        "msg": "email already exit."
                    }]
                });
                
             }

           
        }else{
            return res.status(400).json({
                "errors" : [{
                    "msg": "username already exit."
                }]
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "errors" : [{
                "msg": "there was a problem."
            }]
        });
    }
}

export const loginformdata = async(req,res,next)=>{

  try {
    const data = req.body;
    console.log('jnijnun',data);
    const textmodel = new authModel();
    const logindetails = await textmodel.checklogindetails(data.email);
   console.log('tgt',logindetails)
   if(logindetails != ''){
    const compareresult = compareSync(data.Password, logindetails[0]['Password']);
    console.log(compareresult);
    if(compareresult){
        const jsontoken = sign({id:logindetails[0]['id'],firstName:logindetails[0]['First_Name'],lastName:logindetails[0]['Last_Name'],email:logindetails[0]['email'],Password:logindetails[0]['Password']}, SECRET,{
            expiresIn:'2H'
            
        });
        console.log(jsontoken);
       
       var decoded = jwt_decode(jsontoken, SECRET);
       console.log(decoded)
        return res.status(200).json({
            "token" : jsontoken
        })
    }
    else {
        return res.status(409).json({
            "errors" : [{
                "msg" : "Invalid username or password"
            }]
        });
    }
} else {
    return res.status(409).json({
        "errors" : [{
            "msg" : "Invalid username or password"
        }]
    });
}




    if (data.email==logindetails[0]['email']) {
        return res.status(201).json({
            "success" : [{
                "msg" : "login sucess"
            }]
        });
        
    } 
    else {
        return res.status(400).json({
            "errors" : [{
                "msg": "invalid email"
            }]
        });
    }
   
   } 
  catch (error) {
    console.log(error);
    return res.status(400).json({
        "errors" : [{
            "msg": "invalid email"
        }]
    });
}
  }

  
 