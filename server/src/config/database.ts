import mongoose,{Schema,Model,Document} from "mongoose";
import User from "../models/users";
import  Post  from "../models/posts";
import Comments from "../models/comments";
import { bootstrapData } from "../models/bootstrap";
const connectDb = async ()=>{
    try {
        console.log('At the db')
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
          
        });
        console.log('DB Connected...');
        await initializeModel()
        await bootstrapData()
    } catch (error) {
        console.log('Error connecting', error)
        process.exit(1)
    }
}
const models = [
    User,
    Post,
    Comments
]
const initializeModel = async() => {
    try {
        for (const model of models) { 
            await model.init()
        }
    console.log("Schema Created")
    } catch (error) {
        console.log('Error creating schema', error)
    }
   
}
export default connectDb