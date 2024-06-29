import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Logout = () => {
  
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext)
   
  setCurrentUser(null)
  navigate('/login');

  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
