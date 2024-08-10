import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document{
    userId: number,
    _id: number,
    title: string,
    body: string
}
const postSchema = new Schema({
    userId: { type: Number, ref: 'User', required: true },
    _id: Number,
    title: { type: String, required: true },
    body: { type: String, required: true }
})
export default mongoose.model<Post>('Post',postSchema);