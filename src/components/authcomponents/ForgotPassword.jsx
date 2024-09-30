import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => (
  <div>
    <Link to="/resertPass">
      <button className="bg-white font-medium text-gray-400 hover:text-blue-400">
        Forgot password?
      </button>
    </Link>
  </div>
);

export default ForgotPassword;
