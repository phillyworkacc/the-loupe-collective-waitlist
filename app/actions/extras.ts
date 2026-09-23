import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(file: File) {
   try {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise<any>((resolve, reject) => {
         const uploadStream = cloudinary.uploader.upload_stream({
            folder: "TheLoupeCollectiveBlogImages",
            resource_type: "image",
         }, (error, result) => {
            if (error) reject(error); else resolve(result);
         });
         uploadStream.end(buffer);
      });

      return result.secure_url;
   } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return "";
   }
}