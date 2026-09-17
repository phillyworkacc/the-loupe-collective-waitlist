import { dalDbOperation, dalRequireAuth } from "@/dal/helpers"
import { db } from "@/db"
import { blogsTable } from "@/db/schemas"
import { desc } from "drizzle-orm"
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Blogs from "./Blogs"


export default async function page() {
   const results = await dalRequireAuth(async user =>
      await dalDbOperation(async () => {
         const res = await db.select().from(blogsTable).orderBy(desc(blogsTable.createdAt));
         return res;
      })
   )

   if (results.success) {
      return <Blogs blogs={JSON.parse(JSON.stringify(results.data))} />
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
