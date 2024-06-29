import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}` // Ensure this is `id`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        // Assuming response.data.thumbnail is a URL or path
        setThumbnail(response.data.thumbnail);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post data. Please try again.");
      }
    };

    if (id) {
      getPost();
    }
  }, [id, token]);

  const editPost = async (e) =>{
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title)
    postData.set("category", category)
    postData.set("description", description)
    postData.set("thumbnail", thumbnail)

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
      );
      if(response.status == 200){
        return navigate('/')
      }
    } catch (error) {
        console.log("an error" , error)
    }
}


  const Category_Type = [
    "Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"
  ];

  return (
    <div>
      <div className="bg-white border border-4 rounded-lg shadow relative m-10 mt-36">

        <div className="p-6 space-y-6">
          {error && <div className="text-red-500">{error}</div>}
          <form onSubmit={editPost} >
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Category
                </label>
                <select
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {Category_Type.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="thumbnail"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Upload Post
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  accept=".jpg, .png, .jpeg"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="6"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Details"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 rounded-b">
              <button
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
