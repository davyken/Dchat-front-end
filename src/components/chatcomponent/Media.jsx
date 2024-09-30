import React, { useState } from "react";

function UploadMedia({ isOpen, onClose }) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setSelectedMedia(file);
  };

  const handleUpload = () => {
    // Here you can add logic to upload the media to your server
    console.log("Uploading:", selectedMedia);
    // Close the modal after upload
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-bold">Upload Media</h2>
          <button onClick={onClose} className="text-gray-500">
            ×
          </button>
        </div>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleMediaChange}
          className="border border-gray-200 p-2"
        />
        {selectedMedia && (
          <div>
            <p className="mt-2">Selected Media:</p>
            <img
              src={URL.createObjectURL(selectedMedia)}
              alt="Selected Media"
              className="w-full"
            />
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadMedia;
