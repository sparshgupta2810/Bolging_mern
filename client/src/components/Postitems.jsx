import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItems = ({ postID, thumbnail, title, description, category, creator, createdAt }) => {
  const shortDesc = description?.length > 100 ? `${description.substr(0, 100)}...` : description;
  const shortTitle = title?.length > 30 ? `${title.substr(0, 30)}...` : title;

  const thumbnailUrl = `${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`;

  return (
    <div className="max-w-screen-xl mx-auto p-16">
      <div className="hover:bg-slate-300 shadow-lg hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
        <div className="py-4 px-8">
          <PostAuthor authorId={creator} createdAt={createdAt} />
          <h4 className="text-lg mb-3 font-semibold">
            <Link to={`/posts/${postID}`}>{shortTitle}</Link>
          </h4>
          <p className="mb-2 text-sm text-gray-600">{shortDesc}</p>
          <img 
            src={thumbnailUrl} 
            className="w-full" 
            alt={title} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <hr className="mt-4" />
          <span className="text-xs">Category: </span>
          <span className="text-xs text-gray-500">
            <Link to={`/posts/categories/${category}`}>{category}</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItems;




