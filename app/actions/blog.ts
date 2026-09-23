"use server"
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/db";
import { blogsTable } from "@/db/schemas";
import { uuid } from "@/utils/uuid";
import { eq } from "drizzle-orm";
import { uploadImageToCloudinary } from "./extras";

export async function makeBlogPost (title: string, subtitle: string, content: string, image: File) {
   try {
      const blogId = `blog-${uuid()}`;

      const imageUrl = await uploadImageToCloudinary(image);

      if (!imageUrl) throw new Error("Image could not be uploaded");

      const result = await dalRequireAuth(async user => 
         await dalDbOperation(async () => {
            const res = await db.insert(blogsTable).values({
               blogId, title, subtitle, content, imageUrl, createdAt: Date.now().toString()
            });
            return (res.rowCount === 1);
         })
      )

      return result.success ? result.data : false;

   } catch (err) {
      console.error(err);
      return false;
   }
}


export async function deleteBlogPost (blogId: string) {
   try {
      const result = await dalRequireAuth(async user => 
         await dalDbOperation(async () => {
            const res = await db.delete(blogsTable).where(eq(blogsTable.blogId, blogId));
            return res.rowCount === 1;
         })
      )

      return result.success ? result.data : false;

   } catch (err) {
      console.error(err);
      return false;
   }
}