import mongoose, { Schema, Document } from "mongoose";

export interface Comments extends Document{
   
    postId: number,
    _id:number
    name: string,
    email: string,
    body: string
}
const commentSchema = new Schema({
    postId: { type: Number, ref: 'Post', required: true },
    _id:Number,
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true }
})
export default mongoose.model<Comments>('Comments',commentSchema);