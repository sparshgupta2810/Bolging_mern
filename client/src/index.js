import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import CategoryPost from './pages/CategoryPost';
import DashBorad from './pages/DashBorad';
import EditPost from './pages/EditPost';
import AuthorPosts from './pages/AuthorPosts.jsx';
import UserProvider from './context/userContext.js';

const router = createBrowserRouter([
  {
    path : "/",
    element : <UserProvider><Layout/></UserProvider>,
    errorElement : <ErrorPage/>,

    children : [
      {index: true, element: <Home/>},
      {path: "posts/:id", element: <PostDetails/>},
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>},
      {path: "profile/:id", element: <UserProfile/>},
      {path: "authors", element: <Authors/>},
      {path: "create", element: <CreatePost/>},
      {path: "posts/users/:id", element: <AuthorPosts/>},
      {path: "posts/categories/:category", element: <CategoryPost/>},
      {path: "myposts/:id", element: <DashBorad/>},
      {path: "posts/:id/edit", element: <EditPost/>},
      {path: "logout", element: <Logout/>},
      
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


reportWebVitals();
