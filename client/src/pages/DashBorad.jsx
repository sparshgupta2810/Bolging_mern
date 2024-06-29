import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeletePost from "./DeletePost";
import axios from "axios";

const DashBorad = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response?.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
      setIsLoading(false);
    };

    if (id) {
      fetchPost();
    }
  }, [id, token]);

  return (
    <div>
      <section className="text-gray-600 body-font ml-28">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {posts.length > 0 ? (
              posts.map((post) => {
                const shortTitle = post.title?.length > 15 ? `${post.title.substr(0, 15)}...` : post.title;
                return (
                  <div className="p-4 lg:w-1/3 hover:shadow-xl hover:bg-slate-100 " key={post._id}>
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <img
                        alt="team"
                        className="flex-shrink-0 rounded-lg w-24 h-24 object-cover object-center sm:mb-0 mb-4"
                        src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
                      />
                      <div className="flex-grow sm:pl-8">
                        <h2 className="title-font mt-9 font-medium text-lg text-gray-900">
                          <Link to={`/posts/${post._id}`}>{shortTitle}</Link>
                        </h2>
                        <h3 className="text-gray-500 mb-3">
                          <Link to={`/posts/categories/${post.category}`}>{post.category}</Link>
                        </h3>
                        <div className="flex-row justify-center mb-10">
                          <button className="inline-flex text-white mr-3 bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                            <Link to={`/posts/${post._id}/edit`}>Edit</Link>
                          </button>
                          <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                            <DeletePost postId={post._id} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>No post Found</h2>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBorad;


