import React, { useEffect, useState } from 'react';
import PostItems from '../components/Postitems';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`);
        console.log('API Response:', response); // Log entire response object
        if (response && response.data) {
          setPosts(response.data);
        } else {
          console.error('No data found in response:', response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-16">
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
              creator={post.creator}
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <h2>No posts found</h2>
        )}
      </div>
    </div>
  );
}

export default AuthorPosts;




