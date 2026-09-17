"use server"
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/db";
import { blogsTable } from "@/db/schemas";
import { uuid } from "@/utils/uuid";
import { eq } from "drizzle-orm";

export async function makeBlogPost (title: string, content: string, imageUrl: string) {
   try {

      const blogId = `blog-${uuid()}`;

      const result = await dalRequireAuth(async user => 
         await dalDbOperation(async () => {
            const res = await db.insert(blogsTable).values({
               blogId, title, content, imageUrl, createdAt: Date.now().toString()
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