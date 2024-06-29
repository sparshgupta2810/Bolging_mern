import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loading from "../components/Loading";
import DeletePost from "./DeletePost";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data); // Ensure this is a single post object
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to fetch post data");
      }
      setIsLoading(false);
    };

    getPost();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        {post && (
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div className="flex justify-between w-full">
              <div className="pl-10">
                <PostAuthor
                  authorId={post.creator}
                  createdAt={post.createdAt}
                />
              </div>

              {currentUser?.id === post?.creator && (
                <div className="flex justify-center mb-10">
                  <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    <Link to={`/posts/${id}/edit`}>Edit</Link>
                  </button>

                  <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                    <DeletePost postId={id} />
                  </button>
                </div>
              )}
            </div>
            <img
              className="lg:w-3/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
              alt={post.title}
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
            />
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {post.title}
              </h1>
              <p className="mb-8 leading-relaxed">{post.description}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PostDetails;
