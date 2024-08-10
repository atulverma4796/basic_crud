import { Router, Request, Response } from "express";
import Posts from "../models/posts";

const router = Router()

router.get("/allPosts", async (req: Request, res: Response) => { 
    try {
        const posts = await Posts.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails",
                    
                    
                }
            },
            {
                $unwind:"$userDetails"
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                }
            },
            {
                $addFields: {
                    commentCount:{$size:"$comments"}
                }
            },
            {
                $project: {
                    title: 1,
                    body: 1,
                    userId: 1,
                    userDetails: {
                        name: 1,
                        email:1
                    },
                    commentCount: 1
                }
            }
        ])
        res.json(posts)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})
export default router;