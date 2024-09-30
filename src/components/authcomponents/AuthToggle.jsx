import React from "react";

const AuthToggle = ({ isSignup, toggleAuthMode }) => (
  <div className="text-center text-sm text-gray-500">
    {isSignup ? (
      <>
        Already have an account?{" "}
        <button
          onClick={toggleAuthMode}
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Sign In
        </button>
      </>
    ) : (
      <>
        Don't have an account?{" "}
        <button
          onClick={toggleAuthMode}
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Sign Up
        </button>
      </>
    )}
  </div>
);

export default AuthToggle;
