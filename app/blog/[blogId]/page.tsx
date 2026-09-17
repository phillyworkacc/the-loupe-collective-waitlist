import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/db";
import { blogsTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import BlogPage from "./BlogPage";


type BlogPostPage = {
   params: Promise<{
      blogId: string;
   }>
}

export default async function page ({ params }: BlogPostPage) {
   const { blogId } = await params;

   const blog = await dalRequireAuth(async user =>
      await dalDbOperation(async () => {
         const [res] = await db.select().from(blogsTable).where(eq(blogsTable.blogId, blogId)).limit(1);
         return res ? res : null;
      })
   );

   if (blog.success) {
      if (blog.data) {
         return (
            <BlogPage blog={JSON.parse(JSON.stringify(blog.data))} />
         )
      } else {
         <AppWrapper>
            <div className="text-xs pd-15">Invalid Blog Post</div>
         </AppWrapper>
      }
   } else {
      return (
         <AppWrapper>
            <div className="text-xs pd-15">
               Failed to load all the blog post
            </div>
         </AppWrapper>
      )
   }
}
