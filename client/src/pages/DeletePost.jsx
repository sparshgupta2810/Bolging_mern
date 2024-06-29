import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser?.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error("An error occurred while deleting the post:", error);
    }
  };

  return (
      <Link
        onClick={deletePost}
      >
        Delete
      </Link>
  );
};

export default DeletePost;
