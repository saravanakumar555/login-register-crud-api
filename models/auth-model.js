
import { query } from "../config/dbcon.js"



export default class authModel{
    async addregistrationform(body){
    console.log(body)
         return await query('INSERT INTO registration (First_Name, Last_Name, Email, Password,Conform_Password) VALUES (?,?,?,?,?)',
            [body.firstName, body.lastName, body.email, body.Password, body.ConformPassword])
 
    
    }
    async checkusername(firstName){
        
        return await query("SELECT First_Name FROM registration where First_Name=?",[firstName]);
    }
    async checkuseremail(email){
        
        return await query("SELECT email FROM registration where email=?",[email]);
    } 
    
   async checklogindetails(email){
     
    return await query("SELECT id,First_Name,Last_Name,email,Password FROM registration where email=?",[email]);

   }

    
}


