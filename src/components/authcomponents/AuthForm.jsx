import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = ({
  isSignup,
  formData,
  handleInputChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  formErrors,
}) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    {isSignup && (
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
        {formErrors && formErrors.username && <p>{formErrors.username.msg}</p>}
      </div>
    )}
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      />
      {formErrors && formErrors.email && <p>{formErrors.email.msg}</p>}
    </div>
    <div className="relative">  
  <label  
    htmlFor="password"  
    className="block text-sm font-medium text-gray-700"  
  >  
    Password  
  </label>  
  <input  
    type={showPassword ? "text" : "password"}  
    name="password"  
    id="password"  
    value={formData.password}  
    onChange={handleInputChange}  
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10" // Added padding to the right to avoid overlay with icon  
    required  
  />  
  <div  
    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"  
    onClick={() => setShowPassword(!showPassword)}  
  >  
    {showPassword ? <FaEyeSlash /> : <FaEye />}  
  </div>  
  {formErrors && formErrors.password && <p>{formErrors.password.msg}</p>}  
</div>
    <button
      type="submit"
      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {isSignup ? "Sign Up" : "Sign In"}
    </button>
  </form>
);

export default AuthForm;
