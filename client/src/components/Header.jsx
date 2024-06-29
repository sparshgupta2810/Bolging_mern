import React, { useContext } from "react";
import avatar1 from "../assets/avatar1.jpg";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import Logo from '../assets/Blog-logo.png';
const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <header class="fixed bg-slate-200 inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100  py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
        <div class="px-4">
          <div class="flex items-center justify-between">
            <div class="flex shrink-0">
              <a aria-current="page" class="flex items-center" href="/">
                <img
                  class="h-7 w-auto"
                  src={Logo
                    
                  }
                  alt=""
                />
                <p class="sr-only">Website Title</p>
              </a>
            </div>
            {currentUser?.id && (
              <>
                <div class="hidden md:flex md:items-center md:justify-center md:gap-5">
                  <a
                    aria-current="page"
                    class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Link to={`/profile/${currentUser?.id}`}>{currentUser?.name}</Link>
                  </a>
                  <a class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                    <Link to="/create">Create Post</Link>
                  </a>
                  <a class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                    <Link to="/authors">Author</Link>
                  </a>
                </div>
                <div class="flex items-center justify-end gap-3">
                  <a class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    <Link to="/logout">Logout</Link>
                  </a>
                </div>
              </>
            )}

            {!currentUser?.id && (
              <>
                <div class="hidden md:flex md:items-center md:justify-center md:gap-5">
                  <a class="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                    <Link to="/authors">Author</Link>
                  </a>
                </div>
                <div class="flex items-center justify-end gap-3">
                  <a class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    <Link to="/login">Login</Link>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
