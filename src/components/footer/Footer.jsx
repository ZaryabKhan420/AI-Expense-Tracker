import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div>
        <div className="flex justify-between items-center my-5 flex-wrap">
          <Link to={"/"} className="flex gap-2 items-center justify-center">
            <img
              src={"/logo.svg"}
              alt="Logo"
              loading="lazy"
              className="h-8 w-8"
            />
            <h2 className="text-2xl font-bold">Finan Smart</h2>
          </Link>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="my-3 p-3 border-t-gray-400 border">
        <p className="text-sm text-center">
          All Rights reserved by Finan Smart
        </p>
      </div>
    </footer>
  );
};

export default Footer;
