import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BlogType } from "@jaitin/medium-common";

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // const blog = blogs.find((b) => b.id === parseInt(id || '', 10));
  
    // if (!blog) {
    //   return <p>Blog not found.</p>;
    // }
    const [blog, setBlog] = useState<BlogType>({
        title: "",
        content: "",
        name: "",
        date: "",
        id: "",
        tags: []
    });
    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/app/v1/blog/get/${id}`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("user")}`
                    }
                  });
                  return res.data;
            } catch (error) {
                console.log((error as Error).message)
            }
        }
        fetchData().then((data) => {
            // console.log("blog data is ", data);
            setBlog(data);
          }).catch((error) => {
            console.error("Error fetching blog data:", error);
          });
    },[])


    return (
      <div className="h-[calc(100vh - 100px)] bg-gray-100 p-8 mt-[100px]">
        <div className="max-w-3xl mx-auto bg-white border rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>{blog?.name}</span>
            <span>{blog?.date}</span>
          </div>
          <h1 className="text-3xl font-semibold mb-4">{blog?.title}</h1>
          <p className="text-gray-700 mb-4">{blog?.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* {blog.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                {tag}
              </span>
            ))} */}
          </div>
          <Link to="/" className="bold hover:underline text-sm">
            Back to Blog List
          </Link>
        </div>
      </div>
    );
  };
  
  export default BlogDetail;