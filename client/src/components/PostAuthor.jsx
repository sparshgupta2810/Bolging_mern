import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const PostAuthor = ({ authorId, createdAt }) => {
  const [author, setAuthor] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorId}`);
        console.log('Author API Response:', response); // Log entire response object
        if (response && response.data) {
          setAuthor(response.data);
        } else {
          console.error('No data found in response:', response);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch author data');
      }
    };

    console.log('AuthorId Prop:', authorId); // Log authorId prop for debugging
    if (authorId) {
      getAuthor();
    }
  }, [authorId]);

  const formattedDate = createdAt ? format(new Date(createdAt), 'PPP') : 'Date unknown';

  return (
    <div>
      <Link to={`/posts/users/${authorId}`}>
        <div className="flex flex-start items-center">
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar || 'default-avatar.png'}`}
            className="rounded-full h-12 w-12 mb-4"
            alt="Avatar"
          />
          <div className="ml-3">
            <h5 className="mb-2 text-sm font-medium leading-tight">
              By: {author.name || 'John Doe'}
            </h5>
            <p className="text-neutral-500 text-sm dark:text-neutral-400">
              {formattedDate}
            </p>
          </div>
        </div>
      </Link>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PostAuthor;





