import { Router } from "express";


let router = Router();
import { getmyfirstapicall,addreactiveformdata,deleteformdata,getuserdetails,updatereactiveformdata} from "../controllers/myfirstapicall/myfirstapicall.js";
import { addregistrationform,loginformdata } from "../controllers/auth/auth.js";
import {checkAuthToken} from "../middlewares/authguard.js"
router.post('/loginformdata',loginformdata)
router.post('/addregisterationformdata',addregistrationform)

router.get('/getmyfirstapicall',checkAuthToken,getmyfirstapicall)
router.post('/addreactiveformdata', checkAuthToken,addreactiveformdata)
router.post('/deleteformdata',checkAuthToken,deleteformdata)
router.get('/getuserdetails/:id',checkAuthToken,getuserdetails)
router.post('/updatereactiveformdata',checkAuthToken,updatereactiveformdata)



export default router
