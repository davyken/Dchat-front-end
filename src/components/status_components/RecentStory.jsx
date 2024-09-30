import React from "react";

function RecentStory() {
  return (
    <div className="py-5">
      <h2 className="text-center font-bold py-4">Viewed Story</h2>
      <div className="flex flex-2 border-blue-700 border-t-2 py-2 items-center justify-between">
        <img
          className="w-20 h-20 rounded-full"
          src="images/blog-header.jpg"
          alt=""
        />
        <p>updated time</p>
        <h1 className="bold">...</h1>
      </div>
      <div className="flex flex-2 border-blue-700 border-t-2 py-2 items-center justify-between">
        <img
          className="w-20 h-20 rounded-full"
          src="images/blog-header.jpg"
          alt=""
        />
        <p>updated time</p>
        <h1 className="bold">...</h1>
      </div>
      <div className="flex flex-2 border-blue-700 border-b-2 border-t-2 py-2 items-center justify-between">
        <img
          className="w-20 h-20 rounded-full"
          src="images/blog-header.jpg"
          alt=""
        />
        <p>updated time</p>
        <h1 className="bold">...</h1>
      </div>
    </div>
  );
}

export default RecentStory;
