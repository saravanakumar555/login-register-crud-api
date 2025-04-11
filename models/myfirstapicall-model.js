import { query } from "../config/dbcon.js"

export default class getmyfirstapicallModel{
    constructor(){}
    async getformdatalist(){
         return await query('SELECT * FROM reactive_form_data')
       

    }


   async addreactiveformdata(body){
        console.log(body)
        if (body.type=='add') {
            return await query('INSERT INTO reactive_form_data (First_name, Last_Name, email, phone, address, Gender) VALUES (?,?,?,?,?,?)',
        [body.firstName,body.lastName,body.email,body.phone,body.address,body.gender])
        } 
        }
    async checkusername(firstName){
        
        return await query("SELECT First_name FROM reactive_form_data where First_name=?",[firstName]);
    }
    async checkuseremail(email){
        
        return await query("SELECT email FROM reactive_form_data where email=?",[email]);
    }

    async checkusernamebypage(firstName,id){
        
        return await query("SELECT First_name FROM reactive_form_data where First_name=? AND id!=?",[firstName,id]);
    }
    async checkuseremailbypage(email,id){
        
        return await query("SELECT email FROM reactive_form_data where email=? AND id!=?",[email,id]);
    }




    async deleteformdata(body){
        console.log(body)
       return await query("DELETE FROM reactive_form_data WHERE id=?",[body.id]);

    }


    async getuserdetails(userid){
        return await query("SELECT * FROM reactive_form_data WHERE id=?",[userid])
       }

        

   async updatereactiveformdata(body){
    console.log('modelbody:',body)
    return await query('UPDATE reactive_form_data SET First_name = ?, Last_Name = ?,email=?, phone = ?, address = ?, Gender = ? WHERE id=?',
    [body.firstName,body.lastName,body.email,body.phone,body.address,body.gender,body.id])
}

}
