import {v2 as cloudinary } from "cloudinary"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_KEY,
    api_key: process.env.CLOUDINARY_API_SECRET,
})
export default cloudinary;
