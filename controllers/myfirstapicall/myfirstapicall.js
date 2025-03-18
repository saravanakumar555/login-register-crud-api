import multer from 'multer';
import getmyfirstapicallModel from "../../models/myfirstapicall-model.js"

export const  getmyfirstapicall = async(req,res,next)=>{


    try {
        console.log(req.body)
        const textmodel = new getmyfirstapicallModel();
        const formdatalist = await textmodel.getformdatalist()
        return res.json({
            data : formdatalist
        })
    } catch (error) {
        
        return res.status(500).json({
            "errors" : [{
                "msg": "there was a problem."
            }]
        });
    }
    
}


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   const upload = multer({ storage: storage });

export const addreactiveformdata = async(req,res,next) => {
    try {

       
       const datas=req.body;
       console.log(datas)
       const textmodel = new getmyfirstapicallModel();
       const check = await textmodel.checkusername(datas.firstName);
       
       if(check==''){
       const email = await textmodel.checkuseremail(datas.email);
        if(email==''){
                await textmodel.addreactiveformdata(datas)
                return res.status(201).json({
                    "success" : [{
                        "msg" : "data added sucess"
                    }]
                });

             }else{
                return res.status(500).json({
                    "errors" : [{
                        "msg": "email already exit."
                    }]
                });
                
             }

           
        }else{
            return res.status(500).json({
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



export const deleteformdata = async(req,res,next) => {
    try {
        const datas=req.body;
        console.log(req.body)
        const textmodel = new getmyfirstapicallModel();
        await textmodel.deleteformdata(datas)
        
        return res.status(201).json({
            "success" : [{
                "msg" : "data deleted sucess"
            }]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "errors" : [{
                "msg": "there was a problem."
            }]
        });
    }
}



export const  getuserdetails = async(req,res,next)=>{


    try {
        const userid = req.params.id
        // const username = req.params.name
        console.log(userid)
        const textmodel = new getmyfirstapicallModel();
        const formdatalist = await textmodel.getuserdetails(userid)
        console.log(formdatalist);
        return res.json({
            data : formdatalist[0]
        })
    } catch (error) {
        
        
        return res.status(500).json({
            "errors" : [{
                "msg": "there was a problem."
            }]
        });
    }
    
}
export const updatereactiveformdata = async(req,res,next) => {
    try {
        const updatedatas=req.body;
        console.log('1',updatedatas);
        const textmodel = new getmyfirstapicallModel();
        const check2 = await textmodel.checkusernamebypage(updatedatas.firstName,updatedatas.id);
        if(check2==''){
        const email = await textmodel.checkuseremailbypage(updatedatas.email,updatedatas.id);
        if(email==''){
                 await textmodel.updatereactiveformdata(updatedatas)
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
         return res.status(400).json({
             "errors" : [{
                 "msg": "there was a problem."
             }]
         });
     }




 }
 