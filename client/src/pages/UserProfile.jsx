import React, { useContext, useEffect, useState } from "react";
import DashBorad from "./DashBorad";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isAvatar, setIsAvatar] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUser(); // Fetch user details on component mount
    }
  }, [token, navigate]);

  const changeAvatarHandler = async () => {
    setIsAvatar(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar); // Set avatar if needed
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate("/logout"); // Redirect or handle logout logic
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden mt-20">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto justify-between flex flex-wrap gap-20">
          <div className="text-center my-4">
            <div>
              <img
                className="shadow-lg h-80 w-80 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                alt=""
              />
              <form action="">
                <input
                  className="hidden"
                  id="avatar"
                  name="avatar"
                  type="file"
                  onChange={(e) => {
                    console.log("Selected file:", e.target.files[0]); // Log selected file
                    setAvatar(e.target.files[0]);
                  }}
                />
                <label htmlFor="avatar" onClick={() => setIsAvatar(true)}>
                  <FaEdit />
                </label>
              </form>
              {isAvatar && (
                <button
                  onClick={changeAvatarHandler}
                  className="bg-indigo-500 mt-4 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  <IoCheckmarkDoneCircle />
                </button>
              )}
            </div>

            <div className="py-2 justify-center">
              <h3 className="font-bold text-2xl text-gray-800 mb-1">
                {currentUser.name}
              </h3>
            </div>
          </div>

          <div className="w-full flex-col flex lg:w-2/4">
            <form
              onSubmit={updateUserDetails}
              className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update name state
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="currentPassword"
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-800 font-bold mb-2"
                  htmlFor="confirmNewPassword"
                >
                  Confirm New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit" // Change type to submit
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <DashBorad />
    </section>
  );
};

export default UserProfile;
