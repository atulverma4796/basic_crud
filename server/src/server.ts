// const express = require('express');
// const userRouter = require("./routes/users/user-route")
// const app = express();
// const PORT = process.env.PORT || 5001
// app.use(express.json());
// app.use("/users", userRouter)
// app.listen(PORT, function () {
//     console.log(`listening on ${PORT}`)
// })
import express, { Request, Response } from "express";
import connectDb from "./config/database";
import mongoose, { Schema} from 'mongoose';
import User from './models/users';
import allPosts from "./routes/common-data"
import userRouter from './routes/user'
import cors from 'cors'
require('dotenv').config()

export class App{
    private app: express.Application;
    constructor(){
        this.app = express();
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true, // enable set cookie
            preflightContinue: false, // allow preflight requests
            allowedHeaders:['Content-Type', ]
        }))
         this.init()
    }
    public listen(port: number) {
        this.app.listen(port, () => {
           console.log(`listening on ${port}`)
       })
    }
    private setupRoutes() {
       
        this.app.use(express.json()) //Middleware to parse the body
        this.app.use("/" ,allPosts)
        this.app.use("/",userRouter)
        this.app.get("/", (_req: Request, res: Response) => {
            res.send("Hello World");
        });
    }
    public init=async()=> {
        await connectDb()
        const connect = await mongoose.connection
        // console.log('Connected to Mongoose', connect)
        this.setupRoutes()
    }
    public getUser = async () => {
        let users = await User.findById('669cd4ea58e16e6e740888ea')
        if (users) {
            
            // console.log(users.basicDetail())
        }
       
    }
}
const app = new App()
const PORT = process.env.API_PORT
app.listen(Number(PORT))