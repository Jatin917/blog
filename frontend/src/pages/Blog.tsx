import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogCard from '../comonents/BlogCard';
import { BlogType } from '@jaitin/medium-common';
import { useRecoilValue } from 'recoil';
import { searchState } from '../store/atom/atom';


const Blog = () => {
  const [blogData, setBlogData] = useState<BlogType[]>([]); // Initialize as an empty array
  const [filtered, setFiltered] = useState<BlogType[]>([]);
  const searchText = useRecoilValue(searchState);
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
      setFiltered(data);
    }).catch((error) => {
      console.error("Error fetching blog data:", error);
    });
  }, []);
  console.log("searchtext", searchText);
  useEffect(()=>{
      const filteredData = filtered.filter((blog) => blog.title.toLowerCase().includes(searchText.toLowerCase()));
      setBlogData(filteredData);

  },[searchText])

  return (
    <div className=' flex gap-3 flex-col w-[75%] m-auto- z-0'>
      {
        blogData.length > 0 ? blogData.map((blog: BlogType) => (
          <BlogCard key={blog.id} id={blog.id} title={blog.title} content={blog.content} author={blog.name} date={blog.date} tags={blog.tags} />
        )) : <p>Loading...</p> // Optional: Show a message if there are no blogs
      }
    </div>
  );
}

export default Blog;