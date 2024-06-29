import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PostItems from "./Postitems"; // Corrected import

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        setPosts(response.data); // Assuming your API response is an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-24">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItems
              key={post._id}
              postID={post._id}
              thumbnail={post.thumbnail}
              title={post.title}
              description={post.description}
              category={post.category}
              creator={post.creator} // Ensure creator is correctly passed
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <h2>No posts found</h2>
        )}
      </div>
    </div>
  );
};

export default Posts;




