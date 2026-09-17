'use client'
import { CSSProperties } from "react";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Card from "@/components/Card/Card";
import Spacing from "@/components/Spacing/Spacing";
import BlogsTable from "@/components/Table/BlogsTable";

type BlogsProps = {
   blogs: Blog[];
}

export default function Blogs ({ blogs }: BlogsProps) {
   const router = useRouter();
   const cardStyles: CSSProperties = {
      width: "100%",
      padding: "25px", boxShadow: "0 1px 3px rgba(0,0,0,0.098)"
   }


   return (
      <AppWrapper>
         <div className="text-l full bold-700 pd-1">Blog Posts</div>

         <div className="box full pd-1">
            <div className="htv gap-10 mb-1">
               <Card styles={cardStyles}>
                  <div className="text-xxs grey-5 full mb-05">Total Blog Posts</div>
                  <div className="text-xxl full bold-700 mb-05 accent-color">{blogs.length}</div>
               </Card>
            </div>
         </div>
            
         <div className="box full dfb align-center justify-start pd-1 gap-10 wrap mb-1">
            <button className="xxs pd-1 pdx-2" onClick={() => router.push("/add-blog")}>
               <CirclePlus size={17} /> Add Blog Post
            </button>
         </div>

         <Spacing size={2} />
         <BlogsTable blogs={blogs} onClickBlog={blog => router.push(`/blog/${blog.blogId}`)} />
         <Spacing size={3} />
      </AppWrapper>
   )
}
