import React from "react";

const SearchBar = () => {
  return (
    <div className="my-4">
      <input
        type="text"
        className="w-full p-2 border rounded-lg outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
