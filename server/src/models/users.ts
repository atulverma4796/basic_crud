import mongoose, { Schema, Document } from "mongoose";

export interface Address{
    street: string,
    city: string,
    zipCode: string,
    suite: string,
    geo: {
        lat: string,
        lng: string
    }
}
export interface User extends Document{
    _id: number,
    username: string,
    name: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    }

}
const addressSchema = new Schema({
    street: { type: 'string', required: true },
    suite: { type: 'string', required: true },
    city: { type: 'string', required: true },
    zipCode: { type: 'string', required: true },
    geo: {
        lat: { type: 'string', required: true },
        lng: { type: 'string', required: true }
    }
},{_id: false})
const UserSchema: Schema<User> = new Schema({
    _id:Number,
    username: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    name: { type: 'string', required: true },
    address: { type: addressSchema, required: true },
    phone: { type: 'string', required: true },
    website: { type: 'string', required: true },
    company: {  name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true } }
    
})
UserSchema.methods.basicDetail = function ()  {
    return this.userId?`${this.username} has an email address ${this.email}`:'User has an email address'
}
export default mongoose.model<User>('User',UserSchema)
