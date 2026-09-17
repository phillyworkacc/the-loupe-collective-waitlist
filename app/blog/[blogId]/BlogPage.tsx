'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Spacing from "@/components/Spacing/Spacing";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import { deleteBlogPost } from "@/app/actions/blog";
import { formatMilliseconds } from "@/utils/date";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";


type BlogPageProps = {
   blog: Blog;
}

export default function BlogPage ({ blog }: BlogPageProps) {
   const router = useRouter();

   async function handleDeleteBlogPost (callback: Function) {
      if (confirm("Are you sure you want to delete this blog post?")) {
         const deleted = await deleteBlogPost(blog.blogId);
         if (deleted) {
            toast.success("Deleted Blog Post!");
            router.push("/blogs");
         } else {
            toast.error("Failed to delete blog post");
         }
      }
      callback();
   }

   return (
      <AppWrapper>
         <div className="box full h-fit">
            <div className="box full pd-1">
               <Breadcrumb 
                  pages={[
                     { label: "Blogs", href: "/blogs" },
                     { label: blog.title!, href: "/" },
                  ]}
               />
            </div>
            <div className="box full pd-2">
               <img src={blog.imageUrl!} alt="blog image" width={400} />
            </div>
            <div className="text-ml full bold-600 pd-1">{blog.title}</div>
            <div className="text-xs full pd-1" style={{ whiteSpace: "pre-wrap" }}>{blog.content}</div>
            <div className="text-xxxs full pd-1 grey-4">{formatMilliseconds(parseInt(blog.createdAt!))}</div>
            <Spacing size={2} />
            <AwaitButton className="xxs pd-12 pdx-2 delete" onClick={handleDeleteBlogPost}>
               <Trash2 size={15} /> Delete Blog Post
            </AwaitButton>
            <Spacing size={5} />
         </div>
      </AppWrapper>
   )
}
