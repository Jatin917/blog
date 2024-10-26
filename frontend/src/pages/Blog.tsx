import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogCard from '../comonents/BlogCard';
import { BlogType } from '@jaitin/medium-common';


const Blog = () => {
  const [blogData, setBlogData] = useState<BlogType[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/app/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`
        }
      });
      return res.data;
    };

    fetchData().then((data) => {
      console.log("blog data is ", data);
      data.reverse();
      setBlogData(data);
    }).catch((error) => {
      console.error("Error fetching blog data:", error);
    });
  }, []);

  return (
    <div className=' flex gap-3 flex-col w-[75%] m-auto- z-0'>
      {
        blogData.length > 0 ? blogData.map((blog: BlogType) => (
          <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} author={blog.name} date={blog.date} tags={blog.tags} />
        )) : <p>No blogs available.</p> // Optional: Show a message if there are no blogs
      }
    </div>
  );
}

export default Blog;