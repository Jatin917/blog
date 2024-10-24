// import React from 'react'

import { CreatePostType } from "@jaitin/medium-common";
import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";

const BlogInput = () => {
  const [blogData, setBlogData] = useState<CreatePostType>({
    title:"",
    content:"",
  });
  const handleBlogs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setBlogData((prev) =>({ ...prev, [name]: value, }));
  }
  const postBlog = async ()=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/app/v1/blog`, blogData, {
        headers:{
          Authorization:`bearer ${localStorage.getItem("user")}`
        }
      });
      if(res.status===200){
        toast.success("Published Successfully!!!");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  return (
    <div className="mt-[200px] flex w-[50%] flex-col m-auto gap-2 ">
        <input name="title" value={blogData.title} onChange={handleBlogs} required type="text" className="p-2 text-4xl  outline-gray-200" placeholder="Title"/>
        <textarea name="content" value={blogData.content} onChange={handleBlogs} required className="resize-none p-2 text-xl outline-gray-200 border-none h-[300px]" placeholder="Enter your blog content"/>
        <button onClick={postBlog} className="p-2 rounded-full bg-green-600 w-[100px] right-0">PUBLISH</button>
    </div>
  )
}

export default BlogInput