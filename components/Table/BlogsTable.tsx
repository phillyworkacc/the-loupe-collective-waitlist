'use client'
import './Table.css'
import { formatMilliseconds } from '../../utils/date';

type BlogsTableProps = {
   blogs: Blog[];
   onClickBlog?: (blog: Blog) => void;
}

export default function BlogsTable ({ blogs, onClickBlog }: BlogsTableProps) {
   return (
      <div className="table-container">
         <table className="waiters-table">
            <thead>
               <tr id='head-row'>
                  <th>Title</th>
                  <th style={{textAlign:"center"}}>Content</th>
                  <th style={{textAlign:"center"}}>Date Created</th>
               </tr>
            </thead>
            <tbody>
               {blogs.map((blog, index) => (
                  <tr key={index} onClick={() => { if (onClickBlog) onClickBlog(blog); }}>
                     <td className='name accent-color'><b>{blog.title}</b></td>
                     <td style={{textAlign:"center"}}>{blog.content.substring(0,15)}...</td>
                     <td style={{textAlign:"center"}}>{formatMilliseconds(parseInt(blog.createdAt), true)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}