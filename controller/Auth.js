// const {database} =require('../database.js')
import database from '../database.js'
// const bcrypt=require('./bcrypt')
import bcrypt from 'bcrypt'
// const jwt=require('./jsonwebtoken')
import jwt from "jsonwebtoken";


  export const register= async (req,res)=>{
      console.log(req.body);
      console.log("hjdbfbfrfrjfrnn  ncxcnn cndcdsjsddcn cx cx zdcndcds cddjdsfsdj    sddsjcdsnjfvnxcxc  ncx     sdnsdjdjfdj---------------------------------------------")
    try{
         const {firstName ,email , password} = req.body;
         const salt= await bcrypt.genSalt();
         const hashPassword= await bcrypt.hash(password,salt);

         const newUser = new database({
            firstName,
            password:hashPassword,
            emails:[],
            myemail:email
        })
        
        delete newUser.password;

        const saved = await newUser.save();
         res.status(200).json(saved);
         
             }catch(err){
                res.status(500).json("error occur"+err.message);
             }
         
         }


            

 


export const login= async (req,res)=>{
         console.log(req.body);
    try{
        const {email,password} = req.body;
        if(!email || ! password) return res.status(401).json({message: "email and password required"})
          if(!email) return res.status(401).json({message: "email"});
          if(!password) return res.status(401).json({message: "password"});

        const JWT_SECRET="vbsvnufjdffjcxcx";
        const user=await database.findOne({myemail:email});
        if(!user) return res.status(404).json({message:"Invalid crediantial"}); 
        console.log(user);
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)  return res.status(404).json({message:"Invalid Password"});
       const token = jwt.sign({ userId: user._id }, JWT_SECRET);


        // delete user.password;


       res.status(201).json({user,token});



    }catch(err){
        res.status(500).json("error occur"+err);
    }

}

// 