import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        setAuthors(response?.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
      setIsLoading(false);
    };

    getAuthors();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  console.log(authors.avatar)

  return (
    <div className="mt-40 mb-20">
      {authors.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        
          {authors.map(({ _id, avatar, name, posts }) => {
            return (
              
              <Link key={_id} to={`/posts/users/${_id}`}>
                <header class="px-2 py-4 flex flex-col justify-center items-center text-center m-5">
                <img
                  class="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 text-indigo-600 h-24 w-24 !h-48 !w-48"
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                  alt={name}
                />
                <h1 class="text-2xl text-gray-500 font-bold mt-2">{name}</h1>
                <h2 class="text-base md:text-xl text-gray-500 font-bold">
                  Posts: {posts}
                </h2>
                </header>
              </Link>
            );
          })}
          </div>
        
      ) : (
        <h2>No Author Found</h2>
      )}
    </div>
  );
};

export default Authors;
