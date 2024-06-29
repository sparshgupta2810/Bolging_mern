import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer class="w-full bg-slate-200 py-4">
        <div class="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
                <div class=" ">
                <ul class="text-lg  flex items-center justify-center flex-col md:flex-row  py-16 gap-6 md:gap-12 transition-all duration-500">
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Agriculture">Agriculture</Link></a></li>
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Business">Business</Link></a></li>
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Education">Education</Link></a></li>
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Weather">Weather</Link></a></li>
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Art">Art</Link></a></li>
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Investment">Investment</Link></a></li>
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Uncategorized">Uncategorized</Link></a></li>
                    <li ><a href="#" class="text-gray-800 hover:text-indigo-600"><Link to="/posts/categories/Entertainment">Entertainment</Link></a></li>
                </ul>
                </div>
           
        </div>
    </footer>
    </div>
  );
};

export default Footer;
