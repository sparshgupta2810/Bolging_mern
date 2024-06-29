import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategories");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // For not having access without login
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  const Category_Type = [
    "Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"
  ]

  const createPost = async (e) =>{
      e.preventDefault();
      const postData = new FormData();
      postData.set("title", title)
      postData.set("category", category)
      postData.set("description", description)
      postData.set("thumbnail", thumbnail)

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/posts`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
        );
        if(response.status == 201){
          return navigate('/')
        }
      } catch (error) {
          console.log("an error" , error)
      }
  }

  return (
    <div>
      <div class="bg-white border border-4 rounded-lg shadow relative m-10 mt-36">
        <div class="p-6 space-y-6">
          <form action="#" onSubmit={createPost}>
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="product-name"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Title
                </label>
                <input
                  type="title"
                  name="title"
                  id="title"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Title"
                  value={title} onChange={e=> setTitle(e.target.value)}
                  required=""
                />
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="category"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Category
                </label>
                <select  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" name = 'category' value={category} onChange={e=> setCategory(e.target.value)}>
                     {
                      Category_Type.map(cat => <option key={cat}>{cat}</option>)
                     }
                </select>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="brand"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Upload Post
                </label>
                <input
                  type="file"
                  name="file"
                  id="Add post"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Add post"
                  onChange={e=> setThumbnail(e.target.files[0])}
                  accept="jpg, png, jpeg"
                  required=""
                />
              </div>
              <div class="col-span-full">
                <label
                  for="product-details"
                  class="text-sm font-medium text-gray-900 block mb-2"
                >
                  Description
                </label>
                <textarea
                  id="product-details"
                  rows="6"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Details"
                  value={description} onChange={e=> setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div class="p-6 border-t border-gray-200 rounded-b">
          <button
            class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Create
          </button>
        </div>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default CreatePost;
