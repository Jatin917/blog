import React from 'react';
import { Link } from 'react-router-dom';

// Props interface for type safety
interface BlogCardProps {
  // key:string,
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  id:string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  author,
  date,
  tags,
  id,
}) => {
  return (
    <Link
      to={`/blog/${id}`}
      className="block max-w-xl mx-auto bg-white border border-gray-300 rounded-lg p-5 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300 w-full"
    >
      {/* Author and Date */}
      <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
        <span className="font-medium">Author: {author || "NA"}</span>
        <span>{date}</span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
        {title}
      </h2>

      {/* Content Preview */}
      <p className="text-gray-700 mb-4 line-clamp-3">
        {content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex space-x-6 text-gray-500 text-sm">
        <button className="hover:text-blue-600 transition">Bookmark</button>
        <button className="hover:text-blue-600 transition">Share</button>
      </div>
    </Link>
  );
};

export default BlogCard;
