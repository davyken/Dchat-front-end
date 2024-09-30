import React from "react";

const VerificationForm = ({
  verificationCode,
  handleVerificationCodeChange,
  handleVerify,
}) => (
  <>
    <div className="flex space-x-2">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          inputMode="numeric"
          value={verificationCode[index] || ""}
          onChange={(e) => handleVerificationCodeChange(e, index)}
          className="w-10 h-10 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      ))}
    </div>
    <p className="text-sm text-gray-500">
      We sent a verification code to your email. If you did not see it in you
      regular mail inbox, check your spam folder or go to "All Mail".
    </p>
    <button
      type="button"
      onClick={handleVerify}
      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Verify
    </button>
  </>
);

export default VerificationForm;
