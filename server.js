// const express=require('express');
import express from 'express';
// const {register} = require('./controller/Auth');
import { register, login } from "./controller/Auth.js";
// const {login} = require('./controller/Auth');
// const {verfyToken} =require('./controller/Mail');
// const {mailInsert}=require('./controller/Mail');
// const {getMail} = require('./controller/Mail');
import { verifyToken, mailInsert, getMail } from "./controller/Mail.js";
// const mongoose=require('mongoose');
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan';
import dotenv from "dotenv";
dotenv.config();






const app = express();
app.use(express.json());

app.use(cors());

app.use(morgan("combined"));


//routes 

app.post('/auth/register',register);
app.post('/auth/login',login);
app.post('/sendMail',verifyToken,mailInsert);
app.get('/getMail',verifyToken,getMail);

console.log(process.env.PORT);


mongoose
  .connect(
    process.env.MONGODB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("mangoose is connect");
  })
  .catch((err) => {
    console.log("error in connecting to mangoose");
  });

const port=process.env.PORT ||5001
app
  .listen(port, () => {
    console.log("server is running " +port);
  })
  .on("error", (err) => {
    console.log("Error encountered : " + err);
  });



