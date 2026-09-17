'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import { useState } from "react";
import { makeBlogPost } from "../actions/blog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function page() {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [imageUrl, setImageUrl] = useState("");
   const router = useRouter();

   async function handleAddBlogPost (callback: Function) {
      const posted = await makeBlogPost(title, content, imageUrl);
      if (posted) {
         toast.success("Blog Posted!");
         router.push("/blogs");
      } else {
         toast.error("Failed to create blog post");
      }
      callback();
   }

   async function handleAddBlogPostAnother (callback: Function) {
      const posted = await makeBlogPost(title, content, imageUrl);
      if (posted) {
         toast.success("Blog Posted!");
         setImageUrl("");
         setTitle("");
         setContent("");
      } else {
         toast.error("Failed to create blog post");
      }
      callback();
   }

   return (
      <AppWrapper>
         <div className="text-l full bold-700 pd-1">Add a Blog Post</div>

         <div className="box full pd-1 dfb column gap-20" style={{ maxWidth: "800px" }}>
            <div className="box full dfb column gap-10">
               <div className="text-xs bold-600 full">Image Url</div>
               <input type="text" className="xxs full pd-13 pdx-2" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
            <div className="box full dfb column gap-10">
               <div className="text-xs bold-600 full">Title</div>
               <input type="text" className="xxs full pd-13 pdx-2" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="box full dfb column gap-10">
               <div className="text-xs bold-600 full">Content</div>
               <textarea className="xxs full pd-13 pdx-2 border-radius-15 h-40" value={content} onChange={e => setContent(e.target.value)} />
            </div>
            <div className="box full pd-1 dfb align-center gap-10">
               <AwaitButton className="xxs pd-1 pdx-2" onClick={handleAddBlogPost}>
                  Add Post
               </AwaitButton>
               <AwaitButton className="xxs pd-1 pdx-2" onClick={handleAddBlogPostAnother}>
                  Add Post & Another
               </AwaitButton>
            </div>
         </div>
      </AppWrapper>
   )
}
