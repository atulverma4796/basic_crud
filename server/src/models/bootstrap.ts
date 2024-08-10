import axios from "axios";
import User from "./users";
import Posts from "./posts";
import Comments from "./comments";
import mongoose from "mongoose";

const API_URL = "https://jsonplaceholder.typicode.com";
export const bootstrapData = async () => {
    let userCount = await User.countDocuments();
    let postsCount = await Posts.countDocuments();
    let commentsCount = await Comments.countDocuments();
    if (userCount > 0 && postsCount > 0 && commentsCount > 0) {
        console.log("Bootstrap Data is already saved")
        return;
    }
    const userResponse = await axios.get(`${API_URL}/users`)
    const userData = userResponse.data
    const fortmatedUserData = userData?.map((user: any) => {
        return {
            _id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            address: {
                street: user.address.street,
                suite: user.address.suite,
                city: user.address.city,
                zipCode: user.address.zipcode,
                geo: {
                    lat: user.address.geo.lat,
                    lng: user.address.geo.lng
                }
            },
            phone: user.phone,
            website: user.website,
            company: {
                name: user.company.name,
                catchPhrase: user.company.catchPhrase,
                bs: user.company.bs
            }
        }
    })
    const createdUser = await User.insertMany(fortmatedUserData)
    const postResponse = await axios.get(`${API_URL}/posts`)
    const postData = postResponse.data
    const formatedPostData = postData.map((post: any) => {
        let user = createdUser.find((user: any) => user._id == post.userId)
        // console.log('userData', createdUser)
        return {
            userId: user?Number(user._id):new mongoose.Types.ObjectId(),
            _id: post.id,
            title: post.title,
            body: post.body
            
        }
    })
    const createdPost = await Posts.insertMany(formatedPostData)
    const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const comments = commentsResponse.data;

    // Map and format data to match your Comment schema
    const formattedComments = comments.map((comment: any) => {
        let post = createdPost.find((post: any) => post._id === comment.postId)
        return {
            postId: Number(post?._id),
            body: comment.body,
            name: comment.name,
            email: comment.email,
        } });

    // Save the formatted data to the Comment collection
    await Comments.insertMany(formattedComments);
    console.log('Bootstrap Data inserted successfully.');

}
// export default bootstrapData;
