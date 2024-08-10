import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/users"
export interface UserDetail extends mongoose.Document{
    _id: number
    username: string,
    name: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipCode: string,
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    }
}

const router = Router();

router.get("/user/:id", async(req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user: UserDetail|null = await User.findById(userId).select('_id username name email address.street address.suite address.city address.zipCode phone website company')
        if (!user) {
            return res.status(404).send({message:'User.not found'})
        }
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error while fetching the user")
    }
   
})
 export default router;