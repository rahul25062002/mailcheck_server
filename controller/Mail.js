
import database from "../database.js";

import Jwt from "jsonwebtoken";

 export const verifyToken = async (req, res, next) => {
   try {
     let token = req.header("Authorization");
     if (!token) return res.status(403).send("Access Denied");

     if (token.startsWith("Bearer ")) {
       token = token.substring(7, token.length);
     }
    const JWT_SECRET = "vbsvnufjdffjcxcx";
     const verified = Jwt.verify(token,JWT_SECRET);

     res.user = verified.user;
     next();
   } catch (err) {
     res.status(500).send("access denied"+err.message);
   }
 };

 export const mailInsert = async (req, res) => {
    try{
        const {email,myemail} =req.body;
          console.log(typeof(email));
         console.log(email)
         
         const pb=Object.values(email);
        




        const user = await database.findOne({myemail:myemail});
        


        
          pb.map(e=>user.emails.push(e))

        // user.emails=newlist;

        const newSave=user.save();

        res.status(200).json(newSave);


    }catch(err){
        res.status(501).json("error ocuur here:"+err.message)
    }
};


 export const getMail= async  (req, res)=>{
    try{
           const {email}=req.body;
           const user= await database.findOne({myemail:email});
           if(!user) res.status(404).json({message:"No user is available"});
           res.status(200).json(user.emails);

    }catch(err){
           res.status(500).json({message:err.message});
    }
}


